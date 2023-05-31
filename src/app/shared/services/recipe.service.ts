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

  getRecipeCards(recipeIDs?: number[], recipeName?: string): void {
    const URL = 'https://localhost:44322/RecipeCard.API/recipeCard/recipeCards';
    let params = new HttpParams({
      fromObject: {'recipeIds': recipeIDs ?? ''}
    })
    .set('recipeName', recipeName ?? '');
    this.http.get<Recipe[]>(URL, { params }).pipe(first()).subscribe(value => {
      if (value) {
        this._recipeCards.next(value);
      }
    })

  }

  getRecentRecipeCards(topX?: number): void {
    const URL = 'https://localhost:44322/RecipeCard.API/recipeCard/recentRecipeCards';
    let params = new HttpParams()
    .set('topX', topX ?? 12);
    this.http.get<Recipe[]>(URL, { params }).pipe(first()).subscribe((value) => {
      if (value) {
        this._recipeCards.next(value);
      }
    })
  }
}
