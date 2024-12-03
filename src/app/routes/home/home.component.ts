import { Component, OnChanges, OnInit, SimpleChanges, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { RecipeCardComponent } from 'src/app/shared/components/recipe-card/recipe-card.component';
import { Router } from '@angular/router';
import { numberOrString } from 'src/app/shared/transforms-or-pipes/number-or-string';
import { Title } from '@angular/platform-browser';
@Component({
    imports: [CommonModule, RecipeCardComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})


export default class HomeComponent implements OnInit, OnChanges {
  recipeService = inject(RecipeService);
  router = inject(Router);
  titleService = inject(Title);
  count = Array(12);

  readonly recipe = input<unknown, any>(null, { transform: numberOrString });

  ngOnInit(): void {
    this.getRecipeResults();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if ((changes?.['recipe']?.currentValue !== changes?.['recipe']?.previousValue) && (!changes?.['recipe']?.firstChange)) {
        this.getRecipeResults();
      }
  }

  getRecipeResults(): void {
    const recipe = this.recipe();
    if (recipe === 0 || recipe) {
      this.titleService.setTitle(`Search results for ${ recipe }`);
      if (typeof recipe === 'number') {
        let recipeArray: number[] = [];
        recipeArray.push(recipe as number);
        this.recipeService.getRecipeCards({ recipeIDs: recipeArray });
      }
      else {
        this.recipeService.getRecipeCards({ recipeName: recipe as string });
      }
    }
    else {
      this.recipeService.getRecentRecipeCards();
    }
  }

}


