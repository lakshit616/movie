import { Routes } from '@angular/router';
import { LogIn } from './login/login';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { TopRatedMovies } from './services/top_rated';
import { TopRated } from './top-rated/top-rated';
import { About } from './about/about';
import { FavouritesList } from './favourites-list/favourites-list';
import { AuthGuard } from './auth.guard';
import { Test } from './test/test';

export const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: LogIn },
  {path:'home',component:Home},
  {path:'top-rated',component:TopRated},
  {path:'about',component:About},
{path:'favourites-list',component:FavouritesList,canActivate:[AuthGuard]},
{path:'test',component:Test}
];
