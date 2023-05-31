import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { distinctUntilChanged, first } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { RecipeCardComponent } from 'src/app/shared/components/recipe-card/recipe-card.component';
@UntilDestroy({ checkProperties: true })
@Component({
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  providers: [RecipeService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
//TODO - oninit, this will run the get recipe card service on x random recipe ids
//TODO - within home, we will have x recipe cards that will take in a specific recipe card
export class HomeComponent implements OnInit {

  constructor(
    public recipeService: RecipeService
  ) {}

  ngOnInit(): void {
      this.recipeService.getRecentRecipeCards();
      this.recipeService.recipeCards$.pipe(distinctUntilChanged(), untilDestroyed(this)).subscribe(result => console.log(result));
  }
}
