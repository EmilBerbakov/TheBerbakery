import { Component, DestroyRef, ViewChild, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs';


@Component({
    selector: 'app-recipe-search',
    imports: [MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
    templateUrl: './recipe-search.component.html',
    styleUrls: ['./recipe-search.component.scss']
})


export class RecipeSearchComponent {

  constructor() {

    const recipeControl = this.formGroup?.get('recipe');
    recipeControl?.valueChanges?.pipe(debounceTime(500), startWith(recipeControl?.value), takeUntilDestroyed(this.destroyRef), distinctUntilChanged((a: string, b: string) => a.trim() === b.trim())).subscribe((value: string | number) => this.router.navigate((value === 0 || value) ? [`/search/${value}`] : ['/']));
  }

  recipeService = inject(RecipeService);
  router = inject(Router);
  private destroyRef = inject(DestroyRef);
  fb = inject(FormBuilder);
  formGroup: FormGroup = this.fb.group({
    recipe: ['']
  });

}
