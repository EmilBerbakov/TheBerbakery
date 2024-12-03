import { MatListModule } from '@angular/material/list';
import { Component, Input, OnInit, inject, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Observable, catchError, filter, of, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@Component({
    selector: 'app-recipe-page',
    imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, MatMenuModule],
    templateUrl: './recipe-page.component.html',
    styleUrls: ['./recipe-page.component.scss']
})
export default class  RecipePageComponent implements OnInit {

recipeService = inject(RecipeService);
titleService = inject(Title);
router = inject(Router);

@Input({ transform: numberAttribute }) recipeID!: number;
recipe$?: Observable<Recipe[]>;
url: string = this.router.url;

ngOnInit(): void {
  let recipeArray: number[] = [];
  recipeArray.push(this.recipeID);
  this.recipeService.getRecipeCards({ recipeIDs: recipeArray });
  this.recipe$ = this.recipeService.recipeCards$.pipe(filter(Boolean), tap(recipe => this.titleService.setTitle(`The Berbakery! - ${recipe[0].recipeName}`)));
}

printMethod(): void {
  window.print();
}

shareMethod(): void {
  navigator.share({url: this.url });
}

backMethod(): void {
  this.router.navigate(['/']);
}

}
