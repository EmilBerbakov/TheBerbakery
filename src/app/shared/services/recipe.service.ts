import { Recipe } from './../models/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, first, of, filter } from 'rxjs';
import { environment } from '@environment';

@Injectable()
export class RecipeService {
  _recipeCards = new BehaviorSubject<Recipe[]>([]);
  recipeCards$ = this._recipeCards.asObservable();

  http = inject(HttpClient);
  router = inject(Router);

  getRecipeCards(searchParams: { recipeIDs?: number[], recipeName?: string }): Observable<Recipe[]>{
    //* This logic is no longer needed because of transform functions for inputs
    //console.log(searchParams.recipeIDs)
    // let recipeIDNums: number[] = [];

    // if(searchParams?.recipeIDs && searchParams?.recipeIDs.length > 0) {
    //   recipeIDNums = searchParams.recipeIDs.filter((number) => !Number.isNaN(Number(number))).map(number => Number(number));
    //   recipeIDNums.length === 0 ? this.router.navigate(['*']): null;
    // }


    if (localStorage.getItem('recipes') !== null) {
      let recipes: Recipe[] = JSON.parse(localStorage.getItem('recipes') || '{}').filter((recipe: Recipe) => {
        return searchParams?.recipeIDs?.includes(recipe.recipeId) || searchParams?.recipeName === recipe?.recipeName
      });
      if (recipes.length > 0) {
        return of(recipes);
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
          //console.log(value)
        }
        });
      return this.recipeCards$


  }

  getRecentRecipeCards(topX?: number): Observable<Recipe[]> {
    const URL = `${environment.urls.api}/RecipeCard.API/recipeCard/recentRecipeCards`;
    let params = new HttpParams()
    .set('topX', topX ?? 12);
    this.http.get<Recipe[]>(URL, { params }).pipe(first(), catchError(() => of(JSON.parse(localStorage.getItem('recipes') || '{}') as Recipe[]))).subscribe((values) => {
      if (values) {
        this._recipeCards.next(values);
        localStorage.setItem('recipes', JSON.stringify(values));
      }
    });
    return this.recipeCards$;
  }
}
