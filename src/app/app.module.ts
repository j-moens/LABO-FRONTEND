import {HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FourhofourComponent } from './components/fourhofour/fourhofour.component';
import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CreateUserComponent,
    FourhofourComponent,
    MainComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
