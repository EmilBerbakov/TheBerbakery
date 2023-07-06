
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home.component').then(m => m.HomeComponent),
    title: 'Welcome to The Berbakery!',
    data: { animation: 'Home' }
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'recipe/:recipeID',
    loadComponent: () => import('./routes/recipe-page/recipe-page.component').then(m => m.RecipePageComponent),
    data: { animation: 'Recipe' }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
