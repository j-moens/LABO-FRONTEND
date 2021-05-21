import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import{UsersComponent} from './components/users/users.component'

const routes: Routes = [

   {path: '', redirectTo: 'home', pathMatch: 'full'},
  

   {path: 'create-user', component: CreateUserComponent},
   {path: 'users', component: UsersComponent},
   {path: 'products', component: ProductsComponent},



   {path: 'home', component: MainComponent},
   {path : 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})





export class AppRoutingModule { }
