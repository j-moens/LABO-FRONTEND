import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { BasketComponent } from './components/basket/basket.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DetailsPhoneComponent } from './components/details-phone/details-phone.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FourhofourComponent } from './components/fourhofour/fourhofour.component';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import{UsersComponent} from './components/users/users.component'
import { AdminGuard, AuthGuard } from './services/auth-guard.service';

const routes: Routes = [

   {path: '', redirectTo: 'home', pathMatch: 'full'},
  

   {path: 'create-user', component: CreateUserComponent},
   //{path: 'users', component: UsersComponent},
   {path: 'products', component: ProductsComponent},
   {path: 'details_phone', component: DetailsPhoneComponent},
   {path: 'basket', component: BasketComponent},
 



   {path: 'home', component: MainComponent},
   {path : 'auth', component: AuthComponent},

   { path: '', canActivate: [AuthGuard], children: [ // à partir d'ici, il faut être authentifié pour voir les pages grâce à l'auth guard
   
    { path: 'users/:id', component: ProfileComponent },
    {path : 'confirm-order', component: ConfirmOrderComponent},
    { path: '', canActivate: [AdminGuard], children: [ 
      { path: 'edit_user/:id', component: CreateUserComponent },
    ]},
  ]},

  { path: '', canActivate: [AdminGuard], children: [
    { path: 'users', component: UsersComponent },
    { path: 'edit_user/:id', component: EditUserComponent },
  ]},
  {path: '**',  redirectTo: 'not-found'},
  { path: 'not-found', component: FourhofourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
