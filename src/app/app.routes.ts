import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Admin } from './pages/admin/admin';
import { WorkTeams } from './pages/work-teams/work-teams';
import { WorkTeamId } from './pages/work-team-id/work-team-id';
import { authGuard } from './guards/auth-guard';
import { noGuardGuard } from './guards/no-guard-guard';

export const routes: Routes = [
    { path: 'login', component: Login, canActivate: [noGuardGuard]},
    { path: 'register', component: Register, canActivate: [noGuardGuard]},
    { path: 'home', component: Home, canActivate: [authGuard] ,children: [
      {path: 'admin', component: Admin},
      {path: 'workTeams', component: WorkTeams},
      {path: 'workTeam/:idteam', component: WorkTeamId},
      {path: 'myTaskList', component: Admin},
      {path: 'tools', component: Admin},
      { path: '', redirectTo: 'workTeams', pathMatch: 'full' },
      { path: '**', redirectTo: 'workTeams', pathMatch: 'full' },
    ]},
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
