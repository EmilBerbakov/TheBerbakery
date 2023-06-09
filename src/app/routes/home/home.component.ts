import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { distinctUntilChanged, filter } from 'rxjs';
import { RecipeCardComponent } from 'src/app/shared/components/recipe-card/recipe-card.component';
@Component({
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  providers: [RecipeService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent implements OnInit {

  count = Array(12);
  constructor(
    public recipeService: RecipeService
  ) {}

  ngOnInit(): void {
      this.recipeService.getRecentRecipeCards();
      this.recipeService.recipeCards$.pipe(distinctUntilChanged(), filter(Boolean));
  }
}
