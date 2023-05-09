import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { RecipePreview } from '../recipe/recipe.model';
import { RecipeService } from 'src/components/recipe/recipe.service';

@Component({
  selector: 'app-recipe-images',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recipe-images.component.html',
  styleUrls: ['./recipe-images.component.scss']
})

export class RecipeImagesComponent implements OnInit {
  @Input({ required: true }) recipeID!: number;
  recipePreview$ = this.recipeService.recipeCardInfo$;
  constructor(
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipeCardInfo(this.recipeID);
  }
}
