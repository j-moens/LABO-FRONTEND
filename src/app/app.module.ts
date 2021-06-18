// Material

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";

import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";

import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
// import {  MatRippleModule} from "@angular/material/r";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";

//
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


import { AdminGuard, AuthGuard } from './services/auth-guard.service';
import { UsersService } from './services/users.service';
import { ServerService } from './services/server.service';
import { AuthService } from './services/auth.service';
import { UsersCommonService } from './services/users-common.service';
import { ProductsService } from './services/products.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MatNativeDateModule } from "@angular/material/core";
import { DetailsPhoneComponent } from './components/details-phone/details-phone.component';
import { BasketComponent } from './components/basket/basket.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';

;





export function tokenGetter() {
  return sessionStorage.getItem('id_token');
}


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CreateUserComponent,
    FourhofourComponent,
    MainComponent,
    UsersComponent,
    ProductsComponent,
    ChangePasswordComponent,
    EditUserComponent,
    DetailsPhoneComponent,
    BasketComponent,
    ConfirmOrderComponent,
  

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
   
  
       // material
       MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatListModule,
       MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule,
       MatSlideToggleModule, MatDialogModule, MatSnackBarModule, MatRadioModule,
       MatTabsModule,MatDatepickerModule, MatNativeDateModule,
       //

    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:8000"]
      }}),
    BrowserAnimationsModule,

 
  ],
  providers: [
    UsersService,
    ServerService,
    UsersService,
    AuthService,
    UsersCommonService,
    ProductsService,
    AuthGuard,
    AdminGuard, 
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
