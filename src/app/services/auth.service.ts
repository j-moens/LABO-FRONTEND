import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../models/user.model';
import { ServerService } from './server.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  redirectUrl: string;

  constructor(private http: ServerService, private router: Router) 
  {
    this.isLoggedIn = sessionStorage.getItem('id_token') != null;
    this.redirectUrl = '/';
  }

  public getCurrentUser(): User
  {
    return JSON.parse(sessionStorage.getItem('user') || '');
  }

  public updateCurrentUser(user: User)
  {
    if (!user.password)
    {
      let oldUser = JSON.parse(sessionStorage.getItem('user') || '')
      user.password = oldUser.password;
    }
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public login(user: User): Observable<boolean>
  {
    return this.http.login(user).pipe(
      map(res => 
        {
          this.isLoggedIn = res;
          return res;
        })
    );

  }

  public logout(): void 
  {
    this.isLoggedIn = false;
    this.http.logout();
    this.redirectUrl = '/';
    this.router.navigate(['/']);
  }


}