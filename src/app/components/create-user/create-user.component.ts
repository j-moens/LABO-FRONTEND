import { Component, OnInit } from '@angular/core';
import {User} from'../../models/user.model';
import{ControlContainer, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators, AbstractControl, PatternValidator} from '@angular/forms';
import{ActivatedRoute, Router} from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { UsersCommonService } from 'src/app/services/users-common.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


  userForm!: FormGroup;
  firstnameCtl!: FormControl;
  lastnameCtl!:FormControl;
  number_streetCtl!:FormControl;
  streetCtl!:FormControl;
  zipcodeCtl!:FormControl;
  cityCtl!:FormControl;
  countryCtl!:FormControl;
  extra_infoCtl!:FormControl;
  genderCtl!:FormControl;
  emailCtl!: FormControl;
  passwordCtl!: FormControl;
  confirmPasswordCtl!: FormControl;
  phone_numberCtl!: FormControl;
  isNew: boolean = true;
  user!:User;
  
  
  
    constructor(private usersService : UsersService, 
      private router: Router, 
      private route: ActivatedRoute, 
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private usersCommonService: UsersCommonService) 
    {
      this.initForm();
     }
  
    ngOnInit(): void {
  
      if (this.route.snapshot.params["id"])
      {
        this.isNew = false;
        this.usersService.getOneById(this.route.snapshot.params["id"]).subscribe(m =>
          {
            this.user=m;
            this.userForm.patchValue(this.user);
          });
       
      }
  
  
    }
  
    
  
  
    initForm(): void
    {
     
        this.firstnameCtl = this.formBuilder.control ('', [Validators.required, Validators.minLength(3)], this.firstnameExist());
        this.passwordCtl = this.formBuilder.control ('', [Validators.required, Validators.minLength(3), this.checkPassword()]);
        this.confirmPasswordCtl = this.formBuilder.control ('', [Validators.required, Validators.minLength(3), this.checkConfirm()]);
        this.emailCtl = this.formBuilder.control ('', [Validators.required, Validators.email, Validators.minLength(7)]); 
        this.lastnameCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
        this.number_streetCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
        this.streetCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
        this.zipcodeCtl = this.formBuilder.control('', [Validators.required,  Validators.minLength(1)]);
        this.cityCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
        this.countryCtl = this.formBuilder.control('', [Validators.required,  Validators.minLength(1)]);
        this.extra_infoCtl = this.formBuilder.control('');
        this.genderCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
        this.phone_numberCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);


        this.userForm = this.formBuilder.group({
          firstname: this.firstnameCtl,
          lastname: this.lastnameCtl,
          email: this.emailCtl,
          number_street: this.number_streetCtl,
          street: this.streetCtl,
          zipcode: this.zipcodeCtl,
          city: this.cityCtl,
          country: this.countryCtl,
          extra_info: this.extra_infoCtl,
          gender: this.genderCtl,
          phone_number: this.phone_numberCtl,

          password: this.passwordCtl,
         
          confirmPassword : this.confirmPasswordCtl
         
         
        });
  
    }
    
    firstnameExist(): any
    {
      var timeout: any;
      return (ctl: FormControl) =>
      {
        clearTimeout(timeout);
        const firstname = ctl.value;
        return new Promise(resolve => {
          timeout = setTimeout(() =>{
            if(ctl.pristine)
            {
              resolve(null);
            } else 
            {
              this.usersCommonService.getOneByName(firstname).subscribe(user => 
                {
                  resolve(user && this.isNew ? { firstnameExist: true } : null);
                })
            }
          }, 300)
        });
      }
    }
  
    checkPassword(): ValidatorFn
    {
      return (control: AbstractControl): {[key: string]: any} | null => {
        const password = control.value;


        let hasNumber = /\d/;
        let hasErrors = false;
        let errors = {forbidden: {value: 'passwords and user name are equal'}, pwdAndUsernameEqual: false, pwdMustContainNbr: false, 
        pwdRegEx: false };
      var pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
      );

        if(password === this.firstnameCtl.value&& (! control.hasError('required')))
        {
          hasErrors = true;
          errors.pwdAndUsernameEqual = true;
        } else if (!hasNumber.test(password))
        {
          hasErrors = true;
          errors.pwdMustContainNbr = true;
        } else if (!pattern.test(password))
        {
          hasErrors= true;
          errors.pwdRegEx = true;
        }
        return hasErrors ? errors : null;
    };
  }

  checkConfirm() : ValidatorFn
  {
    return (control : AbstractControl) : {[key: string]: any} | null => {
      const password = control.value;

      if(password != this.passwordCtl.value && (!control.hasError('required')))
      {
        return {forbidden: {value: 'passwords are not the same'}, pwdNotEqual : true};
      }
      return null;
    };
}

  
    onSubmit()
    {
  
      const formVal = this.userForm.value;
      console.log(formVal);
      if (this.isNew)
      {
        formVal.id = 0;
        const newUser= new User(formVal);
        this.usersCommonService.addUsers(newUser).subscribe(m=>{});
      }else
      {
        formVal.id = this.user.id;
        const newUser = new User(formVal);
        this.usersService.updateUser(newUser).subscribe(m =>
          {
            if(m)
            {
              if(this.user.firstname == this.authService.getCurrentUser().firstname)
              {
                this.authService.updateCurrentUser(newUser);
              }
            }
          });
      }
      
      this.router.navigate(['/users']);
      
    }
  
}
