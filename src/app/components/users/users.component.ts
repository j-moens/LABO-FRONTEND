import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import{UsersService} from'../../services/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public usersList!: User[];

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(users =>
      {
        this.usersList = users;
       
      })
  }

  edit(id: any): void
  {
    this.router.navigate(['edit-users/'+id])
  }

  delete(user: User): void
  {
    if(confirm("are you sure to delete ?!!!"))
    {
    this.userService.deleteUser(user).subscribe(users =>
      {
        this.usersList = users;
      });
    }
  }

}
