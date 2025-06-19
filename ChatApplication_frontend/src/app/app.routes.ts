import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.authRoutes)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
