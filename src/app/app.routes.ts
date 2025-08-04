import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then((m) => m.AuthPage),
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout').then((m) => m.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./patients/patients.page').then((m) => m.PatientsPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.page').then((m) => m.SettingsPage),
      },
    ],
  },
];
