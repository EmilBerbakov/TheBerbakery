import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { RecipeCard } from 'src/app/shared/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  _recipeCards = new BehaviorSubject<RecipeCard[]>({} as RecipeCard[]);
  recipeCards$ = this._recipeCards.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getRecipeCards(recipeIDs: number[]): void {
    let params = new HttpParams()
    //TODO - find a more elegant solution for how to send an array of recipe ids since they are going to be ints on the backend, and I'd rather not do type casting if I can help it
    .set('recipe_ids', recipeIDs.join(', '));
    //TODO - data-hosting site
    //TODO - image-hosting site
    this.http.get<RecipeCard[]>('exampleURL.com', { params }).pipe(first()).subscribe(value => this._recipeCards.next(value));
  }
}
