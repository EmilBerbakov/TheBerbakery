import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { RecipePreview } from 'src/components/recipe/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  _recipeCardInfo = new BehaviorSubject<RecipePreview>({} as RecipePreview);
  recipeCardInfo$ = this._recipeCardInfo.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getRecipeCardInfo(recipeID: number): void {
    let params = new HttpParams()
    .set('recipe_id', recipeID);
    //TODO - data-hosting site
    //TODO - image-hosting site
    this.http.get<RecipePreview>('exampleURL.com', { params }).pipe(first()).subscribe(value => this._recipeCardInfo.next(value));
  }
}
