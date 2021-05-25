import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersCommonService } from 'src/app/services/users-common.service';
import { UsersService } from '../../services/users.service';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  passwordCtl!: FormControl;
  passwordConfirmCtl!: FormControl;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, 
    private userService: UsersService, 
    private usersCommonService: UsersCommonService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.passwordCtl = this.formBuilder.control('', [Validators.required, Validators.minLength(6), this.checkPassword()]);
    this.passwordConfirmCtl = this.formBuilder.control('', [Validators.required, this.checkConfirm()]);

    this.passwordForm = this.formBuilder.group({
      password: this.passwordCtl,
      passwordConfirm: this.passwordConfirmCtl
    });
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
      
      if(!hasNumber.test(password))
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

  update()
  {
    console.log("quit!");
    const data = this.passwordForm.value;
    this.dialogRef.close(data);
  }

}
