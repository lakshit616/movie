import { Routes } from '@angular/router';
import { LogIn } from './login/login';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { TopRated } from './top-rated/top-rated';
import { About } from './about/about';
import { FavouritesList } from './favourites-list/favourites-list';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: LogIn },
  {path:'home',component:Home},
  {path:'top-rated',component:TopRated},
  {path:'about',component:About},
{path:'favourites-list',component:FavouritesList}
];
