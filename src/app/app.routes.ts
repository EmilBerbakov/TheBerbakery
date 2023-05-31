
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home.component').then(m => m.HomeComponent),
    title: 'Welcome to the Berbakery!'
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  }
];
