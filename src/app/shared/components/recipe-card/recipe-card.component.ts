import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { RecipeCard } from '../../models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
//TODO - the inpuut will instead be a RecipeCard object, and the service call will move to home
export class RecipeCardComponent implements OnInit {
  @Input({ required: true }) recipeCard!: RecipeCard;
  constructor() {}

  ngOnInit(): void {

  }
}
