import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register},
    { path: 'home', component: Home, children: [
      {path: 'admin', component: Admin},
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: '**', redirectTo: 'admin', pathMatch: 'full' },
    ]},
  /*{
    path: 'admin',
    component: Home,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' }
  }, */
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
