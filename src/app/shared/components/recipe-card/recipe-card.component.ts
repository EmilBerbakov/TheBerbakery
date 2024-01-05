import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { Recipe } from '../../models/recipe.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatProgressSpinnerModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})

export class RecipeCardComponent {

  @Input({ required: true }) recipeCard?: Recipe | null;

  constructor(private router: Router) {}


  recipeNavigation(): void {
    this.router.navigate([`/recipe/${ this.recipeCard?.recipeId }`]);
  }
}
