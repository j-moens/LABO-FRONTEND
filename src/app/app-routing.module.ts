import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import{UsersComponent} from './components/users/users.component'
import { AdminGuard, AuthGuard } from './services/auth-guard.service';

const routes: Routes = [

   {path: '', redirectTo: 'home', pathMatch: 'full'},
  

   {path: 'create-user', component: CreateUserComponent},
   {path: 'users', component: UsersComponent},
   {path: 'products', component: ProductsComponent},



   {path: 'home', component: MainComponent},
   {path : 'auth', component: AuthComponent},

   { path: '', canActivate: [AuthGuard], children: [
   
    { path: 'users/:id', component: ProfileComponent },
    { path: '', canActivate: [AdminGuard], children: [
      { path: 'edit_user/:id', component: CreateUserComponent },
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
