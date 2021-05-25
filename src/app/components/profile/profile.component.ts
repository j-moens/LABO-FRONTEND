import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UsersCommonService } from 'src/app/services/users-common.service';
import { CreateUserComponent} from 'src/app/components/create-user/create-user.component';
import { AuthService } from 'src/app/services/auth.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User = new User({});

  constructor(private router: Router, 
    private route: ActivatedRoute, private userCommonService: UsersCommonService,
      public dialog: MatDialog,
      public snackBar: MatSnackBar,
      private authService: AuthService) { }

  ngOnInit(): void {
    if(this.route.snapshot.params["id"])
    {
      this.userCommonService.getOneByID(this.route.snapshot.params["id"]).subscribe(m => 
        {
          if(m)
          {
            console.log(m);
            this.user = m;
          }
        });
    }
  }

  editProfile()
  {
    const dlg = this.dialog.open(CreateUserComponent, { data: this.user });
    dlg.beforeClosed().subscribe(res => 
      {
        if(res)
        {
          res.id = this.user.id;
          const newUser = new User(res);

          this.userCommonService.updateUser(newUser).subscribe(m =>
            {
              if(m)
              {
                if(this.user.email == this.authService.getCurrentUser().email)
                {
                  this.authService.updateCurrentUser(newUser);
                  this.authService.login(newUser).subscribe();
                  this.user = newUser;
                }
              }
            });
        }
      });
  }

  changePassword()
  {
    const dlg = this.dialog.open(ChangePasswordComponent, { data: this.user });
    dlg.beforeClosed().subscribe(res => 
      {
        if(res)
        {
          res.id = this.user.id;
          res.email = this.user.email;
          const newUser = new User(res);

          this.userCommonService.updatePassword(newUser).subscribe(m =>
            {
              if(m)
              {
                if(this.user.email== this.authService.getCurrentUser().email)
                {
                  this.authService.updateCurrentUser(newUser);
                  this.authService.login(newUser).subscribe();
                  this.user = newUser;
                }
              }
            });
        }
      });
  }
}
