import { Routes } from '@angular/router';
import { LogIn } from './login/login';
import { Signup } from './signup/signup';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: LogIn }
];
