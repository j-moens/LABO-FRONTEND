import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [

   {path: '', redirectTo: 'home', pathMatch: 'full'},
   {path : 'auth', component: AuthComponent},

   {path: 'create-user', component: CreateUserComponent},










   {path: 'home', component: MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})





export class AppRoutingModule { }
