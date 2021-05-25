import { Component, Inject, OnInit } from '@angular/core';
import {User} from'../../models/user.model';
import{FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators, AbstractControl} from '@angular/forms';
import{ActivatedRoute, Router} from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UsersCommonService } from 'src/app/services/users-common.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  adminCtl!: FormControl;
  isNew: boolean = true;
  user!:User;
  
  
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: User, 
    private formBuilder: FormBuilder, 
    private usersCommonService: UsersCommonService) 
{
  this.initForm();
}
  
initForm(): void
{
  this.emailCtl = this.formBuilder.control ('', [Validators.required, Validators.email, Validators.minLength(7)], this.emailExist); 
    this.firstnameCtl = this.formBuilder.control ('', [Validators.required, Validators.minLength(3)]);

    
    this.lastnameCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.number_streetCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.streetCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.zipcodeCtl = this.formBuilder.control('', [Validators.required,  Validators.minLength(1)]);
    this.cityCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.countryCtl = this.formBuilder.control('', [Validators.required,  Validators.minLength(1)]);
    this.extra_infoCtl = this.formBuilder.control('');
    this.genderCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.phone_numberCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(1)]);
    this.adminCtl = this.formBuilder.control(false);


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
     
      confirmPassword : this.confirmPasswordCtl,

      admin: this.adminCtl
     
     
    });

}

    ngOnInit(): void {

    }
  
    
    update()
    {
      const data = this.userForm.value;
      this.dialogRef.close(data);
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
  
    
  
}
