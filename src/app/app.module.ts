import {HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FourhofourComponent } from './components/fourhofour/fourhofour.component';
import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';


import { UsersService } from './services/users.service';
import { ServerService } from './services/server.service';
import { AuthService } from './services/auth.service';
import { UsersCommonService } from './services/users-common.service';
import { ProductsService } from './services/products.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CreateUserComponent,
    FourhofourComponent,
    MainComponent,
    UsersComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    UsersService,
    ServerService,
    AuthService,
    UsersCommonService,
    ProductsService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
