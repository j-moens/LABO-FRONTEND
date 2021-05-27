import { Component, Inject, OnInit } from '@angular/core';
import {User} from'../../models/user.model';
import{FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators, AbstractControl} from '@angular/forms';
import { UsersCommonService } from 'src/app/services/users-common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


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
  phone_numberCtl!: FormControl;
  adminCtl!: FormControl;
  isNew: boolean = true;
  user!:User;
  
  
  constructor(public dialogRef: MatDialogRef<EditUserComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: User, 
    private formBuilder: FormBuilder, 
    private usersCommonService: UsersCommonService) 
{
  this.initForm();
}
  
initForm(): void
{
  this.emailCtl = this.formBuilder.control ('',this.emailExist); 

    this.firstnameCtl = this.formBuilder.control ('');
    this.lastnameCtl = this.formBuilder.control('');
    this.genderCtl = this.formBuilder.control('');
    this.phone_numberCtl = this.formBuilder.control('');
    this.streetCtl = this.formBuilder.control('');
    this.number_streetCtl = this.formBuilder.control('');
    this.zipcodeCtl = this.formBuilder.control('');
    this.cityCtl = this.formBuilder.control('');
    this.countryCtl = this.formBuilder.control('');
    this.extra_infoCtl = this.formBuilder.control('');
    
    
    // this.adminCtl = this.formBuilder.control(false);


    this.userForm = this.formBuilder.group({
      firstname: this.firstnameCtl,
      lastname: this.lastnameCtl,
      email: this.emailCtl,
      gender: this.genderCtl,
      phone_number: this.phone_numberCtl,
      street: this.streetCtl,
      number_street: this.number_streetCtl,
      zipcode: this.zipcodeCtl,
      city: this.cityCtl,
      country: this.countryCtl,
      extra_info: this.extra_infoCtl,
      // 
      // 



      // admin: this.adminCtl
     
     
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
