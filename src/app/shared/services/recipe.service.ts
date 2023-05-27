import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Injectable()
export class RecipeService {
  _recipeCards = new BehaviorSubject<Recipe[] | null>(null);
  recipeCards$ = this._recipeCards.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getRecipeCards(recipeIDs: number[]): void {
    let params = new HttpParams()
    //TODO - find a more elegant solution for how to send an array of recipe ids since they are going to be ints on the backend, and I'd rather not do type casting if I can help it
    .set('recipe_ids', recipeIDs.join(', '));
    //TODO - image-hosting site
    this.http.get<Recipe[]>('exampleURL.com', { params }).pipe(first()).subscribe(value => this._recipeCards.next(value));
  }

  getRecentRecipeCards(topX?: number): void {
    const URL = 'https://localhost:44322/RecipeCard.API/recipeCard/recentRecipeCards';
    let params = new HttpParams()
    .set('topX', topX ?? '');
    this.http.get<Recipe[]>(URL, { params }).pipe(first()).subscribe((value) => {
      if (value) {
        this._recipeCards.next(value);
      }
    })
  }
}
