import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Recipe } from '../../models/recipe.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';


@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatProgressSpinnerModule, MatDialogModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})

export class RecipeCardComponent {
  @Input({ required: true }) recipeCard?: Recipe | null;

  constructor(private dialog: MatDialog) {}

  openRecipeCard(): void {
    //console.log("hi")
    this.dialog.open(RecipeDialogComponent, {
      width: "100%",
      data: {
        ...this.recipeCard
      }

    })
  }
}
