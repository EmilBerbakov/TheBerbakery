import { Recipe } from './../models/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, catchError, filter, first, isEmpty, map, of, tap } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Injectable()
export class RecipeService {
  _recipeCards = new BehaviorSubject<Recipe[] | null>(null);
  recipeCards$ = this._recipeCards.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  publicURI = 'http://66.191.89.135:5000';
  privateURI = 'https://localhost:44322';

  getRecipeCards(recipeIDs?: string[], recipeName?: string): Observable<Recipe[]> | void {

    if (localStorage.getItem('recipes') !== null) {
      console.log(typeof recipeIDs![0]);
      let recipes: Recipe[] = JSON.parse(localStorage.getItem('recipes') || '{}').filter((recipe: Recipe) => recipeIDs?.includes(recipe.recipeId.toString()) || recipeName === recipe.recipeName);
      if (recipes.length > 0) {
        console.log(recipes)
        return of(recipes);
      }
    }

      const URL = `${this.privateURI}/RecipeCard.API/recipeCard/recipeCards`;
      let params = new HttpParams({
        fromObject: {'recipeIds': recipeIDs ?? ''}
      })
      .set('recipeName', recipeName ?? '');
      this.http.get<Recipe[]>(URL, { params }).pipe(first(),
      catchError(() => this.router.navigate(['*'])))
      .subscribe(value => {
        this._recipeCards.next(value as Recipe[])
        });



  }

  getRecentRecipeCards(topX?: number): void {
    const URL = `${this.privateURI}/RecipeCard.API/recipeCard/recentRecipeCards`;
    let params = new HttpParams()
    .set('topX', topX ?? 12);
    this.http.get<Recipe[]>(URL, { params }).pipe(first()).subscribe((values) => {
      if (values) {
        this._recipeCards.next(values);
        localStorage.setItem('recipes', JSON.stringify(values));
      }
    });

  }
}
