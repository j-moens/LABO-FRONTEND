import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersCommonService } from 'src/app/services/users-common.service';
import { UsersService } from '../../services/users.service';
import { MatRadioModule } from "@angular/material/radio";


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


  userForm!: FormGroup;
  firstnameCtl!: FormControl;
  lastnameCtl!:FormControl;
  birth_dateCtl!: FormControl;
  number_streetCtl!:FormControl;
  streetCtl!:FormControl;
  zipcodeCtl!:FormControl;
  cityCtl!:FormControl;
  countryCtl!:FormControl;
  extra_infoCtl!:FormControl;
  genderCtl!: FormControl;
  emailCtl!: FormControl;
  phone_numberCtl!: FormControl;
  adminCtl!: FormControl;
  isNew: boolean = true;
  user!:User;
  passwordCtl!: FormControl;
  passwordConfirmCtl!: FormControl;
  
  
  constructor(private userService: UsersService, 
    private usersCommonService: UsersCommonService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private authService: AuthService)   {
    this.initForm();
  }

  ngOnInit(): void {
    if(this.route.snapshot.params["id"])
    {
      this.userService.getOneById(this.route.snapshot.params["id"]).subscribe(m => 
        {
          if(m)
          {   
            this.isNew = false;
            this.user = m;
            this.userForm.patchValue(this.user);
          }
        });
    }
  }
  
initForm(): void
{
  this.emailCtl = this.formBuilder.control ('', [Validators.required], [this.emailExist()]); 

    this.passwordCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(6), this.checkPassword()]);
    this.passwordConfirmCtl = this.formBuilder.control('', [Validators.required, this.checkConfirm()]);

    this.firstnameCtl = this.formBuilder.control ('', [Validators.required, Validators.minLength(1)]);
    this.lastnameCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.birth_dateCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.number_streetCtl = this.formBuilder.control('');
    this.streetCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.zipcodeCtl = this.formBuilder.control('', [Validators.required,  Validators.minLength(1)]);
    this.cityCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.countryCtl = this.formBuilder.control('', [Validators.required,  Validators.minLength(1)]);
    this.extra_infoCtl = this.formBuilder.control('');
    this.genderCtl = this.formBuilder.control(["H", "F", "X"]);
    this.phone_numberCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.adminCtl = this.formBuilder.control(false);


    this.userForm = this.formBuilder.group({
      firstname: this.firstnameCtl,
      lastname: this.lastnameCtl,
      birth_date: this.birth_dateCtl,
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
      passwordConfirm: this.passwordConfirmCtl,


      admin: this.adminCtl
     
     
    });

}

    emailExist(): any
    {
      var timeout: any;
      return (ctl: FormControl) =>
      {
        clearTimeout(timeout);
        const email = ctl.value;
        return new Promise(resolve => {
          timeout = setTimeout(() =>{
            if(ctl.pristine)
            {
              resolve(null);
            } else 
            {
              this.usersCommonService.getOneByName(email).subscribe(user => 
                {
                  resolve(user && this.isNew ? { emailExist: true } : null);
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

      if(password === this.emailCtl.value && (!control.hasError('required')))
      {
        hasErrors = true;
        errors.pwdAndUsernameEqual = true;
      } else if(!hasNumber.test(password))
      {
        hasErrors = true;
        errors.pwdMustContainNbr = true; 
      } else if(!pattern.test(password))
      {
        hasErrors = true;
        errors.pwdRegEx = true;
      }
      return hasErrors ? errors : null;
    };
  }

  checkConfirm(): ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const password = control.value;

      if(password != this.passwordCtl.value && (!control.hasError('required')))
      {
        return  {forbidden: {value: 'passwords are not the same'}, pwdNotEqual: true };
      }
      return null;
    };
  }

  onSubmit()
  {
    const formVal = this.userForm.value;
    formVal.id = 0;
    const newUser = new User(formVal);
    this.usersCommonService.addUsers(newUser).subscribe(m => {});
    this.authService.login (newUser).subscribe(m=>
      {
        this.router.navigate(['/users/'+this.authService.getCurrentUser().id]);// on se logue automatiquement après la création d'un user

      }); 
  }



  
}
