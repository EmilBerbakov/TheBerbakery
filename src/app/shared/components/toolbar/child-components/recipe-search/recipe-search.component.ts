import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  providers: [RecipeService],
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent {

  formGroup: FormGroup;

  constructor(
    public recipeService: RecipeService,
    private fb: FormBuilder
  ){
    this.formGroup = this.fb.group({
      recipeName: ['']
    })
  }

  getRecipes(): void {
    const values: { recipeName: string } = this.formGroup.getRawValue().trim();
    if (values.recipeName !== '') {
      this.recipeService.getRecipeCards(values);
    }

  }
}
