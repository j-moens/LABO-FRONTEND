import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersCommonService } from 'src/app/services/users-common.service';
import { UsersService } from '../../services/users.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-mat-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'firstname', 'lastname', 'admin', 'actions', 'birth date','phone number', 'street', 'number street', 'zipcode', 'city', 'country', 'extra info'];
  dataSource!: MatTableDataSource<User>;
  public usersList!: User[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService,
    private userCommonService: UsersCommonService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh()
  {
    this.userService.getAll().subscribe(users => 
    {
      this.usersList = users;
      this.updateDataSource();
    });
  }

  updateDataSource()
  {
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(user: User): void
  {
    const dlg = this.dialog.open(EditUserComponent, { data: user });
    dlg.beforeClosed().subscribe(res => 
      {
        if(res)
        {
          res.id = user.id;
          const newUser = new User(res);

          this.userService.updateUser(newUser).subscribe(m =>
            {
              if(m)
              {
                if(user.email == this.authService.getCurrentUser().email)
                {
                  this.authService.updateCurrentUser(newUser);
                }
                this.refresh();
              }
            });
        }
      });
  }

  create()
  {
    const dlg = this.dialog.open(CreateUserComponent, { data:  new User({}) });
    dlg.beforeClosed().subscribe(res =>
    {
      if(res)
      {
        const user = new User(res); 
        this.userCommonService.addUsers(user).subscribe(m =>
          {
            this.refresh();
          });
      }
    });
  }

  delete(user: User): void
  {
    if(confirm("are you sure ?!!!!"))
    {
      this.userService.deleteUser(user).subscribe(users => 
        {
          this.usersList = users;
          this.updateDataSource();
        });
    }
  }

    


}
