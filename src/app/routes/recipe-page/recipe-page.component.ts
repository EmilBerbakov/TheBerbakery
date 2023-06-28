import { MatListModule } from '@angular/material/list';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Observable, filter, first, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule ],
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
  providers: [RecipeService]
})
export class RecipePageComponent implements OnInit {

@Input() recipeID?: number;
recipe$?: Observable<Recipe[]>;

constructor(public recipeService: RecipeService,
            private titleService: Title){}

ngOnInit(): void {
  this.recipeService.getRecipeCards([this.recipeID!]);
  this.recipe$ = this.recipeService.recipeCards$.pipe(filter(Boolean), first(), tap(recipe => this.titleService.setTitle(`The Berbakery! - ${recipe[0].recipeName}`)));
}

}
