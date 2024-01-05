import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { RecipeCardComponent } from 'src/app/shared/components/recipe-card/recipe-card.component';
import { Router } from '@angular/router';
import { numberOrString } from 'src/app/shared/transforms-or-pipes/number-or-string';
import { Title } from '@angular/platform-browser';
@Component({
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export default class HomeComponent implements OnInit, OnChanges {
  recipeService = inject(RecipeService);
  router = inject(Router);
  titleService = inject(Title);
  count = Array(12);

  @Input({ transform: numberOrString }) recipe: unknown = null;

  ngOnInit(): void {
    this.getRecipeResults();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if ((changes?.['recipe']?.currentValue !== changes?.['recipe']?.previousValue) && (!changes?.['recipe']?.firstChange)) {
        this.getRecipeResults();
      }
  }

  getRecipeResults(): void {
    if (this.recipe === 0 || this.recipe) {
      this.titleService.setTitle(`Search results for ${ this.recipe }`);
      if (typeof this.recipe === 'number') {
        let recipeArray: number[] = [];
        recipeArray.push(this.recipe as number);
        this.recipeService.getRecipeCards({ recipeIDs: recipeArray });
      }
      else {
        this.recipeService.getRecipeCards({ recipeName: this.recipe as string });
      }
    }
    else {
      this.recipeService.getRecentRecipeCards();
    }
  }

}


