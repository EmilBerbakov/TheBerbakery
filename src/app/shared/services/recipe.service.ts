import { Recipe } from './../models/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, first, of, filter } from 'rxjs';
import { environment } from '@environment';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  _recipeCards = new BehaviorSubject<Recipe[]>([]);
  recipeCards$ = this._recipeCards.asObservable();

  http = inject(HttpClient);
  router = inject(Router);

  //! Since I moved to

  getRecipeCards(searchParams: { recipeIDs?: number[], recipeName?: string }): void {
    if (localStorage.getItem('recipes') !== null) {
      let recipes = JSON.parse(localStorage.getItem('recipes') || '{}').filter((recipe: Recipe) => {
        return searchParams?.recipeIDs?.includes(recipe.recipeId) || recipe?.recipeName.toUpperCase()?.includes(searchParams?.recipeName?.toUpperCase() as string)
      });
      if (recipes.length > 0) {
        this._recipeCards.next(recipes);
        return;
      }
    }

      const URL = `${environment.urls.api}/RecipeCard.API/recipeCard/recipeCards`;
      let params = new HttpParams({
        fromObject: {'recipeIds': searchParams?.recipeIDs ?? []}
      })
      .set('recipeName', searchParams?.recipeName ?? '');
      this.http.get<Recipe[]>(URL, { params }).pipe(first(),
      catchError(() => this.router.navigate(['*'])))
      .subscribe(value => {
        if (typeof value !== 'boolean') {
          this._recipeCards.next(value as Recipe[])
        }
        });


  }

  getRecentRecipeCards(topX?: number): void {
    const URL = `${environment.urls.api}/RecipeCard.API/recipeCard/recentRecipeCards`;
    let params = new HttpParams()
    .set('topX', topX ?? 12);
    this.http.get<Recipe[]>(URL, { params }).pipe(first(), catchError(() => of(JSON.parse(localStorage.getItem('recipes') || '{}') as Recipe[]))).subscribe((values) => {
      if (values) {
        this._recipeCards.next(values);
        localStorage.setItem('recipes', JSON.stringify(values));
      }
    });
  }
}
