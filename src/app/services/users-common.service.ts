import { Injectable } from '@angular/core';
import{ServerService} from './server.service'
import {User} from '../models/user.model';
import { Observable } from 'rxjs';
import{ map, catchError } from 'rxjs/operators';
import{Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersCommonService {
 

  constructor(private server: ServerService) { 
    
  }

  public getOneByID(id: any): Observable<User | null> 
  {
    return this.server.get<User>('users/'+ id).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public getOneByName(name: string): Observable<User | null>
  {
    return this.server.get<User>('users-common/name/'+name, false).pipe(
      map(res => res.length > 0 ? new User(res[0]): null),
      catchError(err=>
      {
        console.error(err);
        return[];
      } )
    );
  }


  public addUsers(user: User):Observable <User[]>
  {

    return this.server.post<User>('users-common/create', user, false).pipe(
      map(res=> res.map((m: any) =>new User(m))),
      catchError(err=>
      {
        console.error(err);
        return[];
      } )
    );

  }

  public updateUser(user: User): Observable<User | null>
  {
    return this.server.put<User>('users-common/'+ user.id, user).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

  public updatePassword(user: User): Observable<User | null>
  {
    return this.server.put<User>('users-common/password', user).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
          console.error(err);
          return [];
        })
    );
  }

}
