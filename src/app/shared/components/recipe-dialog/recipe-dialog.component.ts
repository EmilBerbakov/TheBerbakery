import { Component, Input, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss']
})
export class RecipeDialogComponent {

  constructor (@Inject(MAT_DIALOG_DATA) public data: Recipe){}

  test(): void {
    console.log(this.data.recipeIngredients)
  }


}
