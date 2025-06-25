import { Routes } from '@angular/router';
import { LogIn } from './login/login';
import { Signup } from './signup/signup';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: LogIn },
  {path:'home',component:Home}
];
