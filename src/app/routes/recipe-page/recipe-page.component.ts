import { MatListModule } from '@angular/material/list';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Observable, filter, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, MatMenuModule ],
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
  providers: [RecipeService]
})
export default class  RecipePageComponent implements OnInit {

recipeService = inject(RecipeService);
titleService = inject(Title);
router = inject(Router);

//! Even though I'm expecting a number here, passing it in to the recipe service converts it to a string
@Input() recipeID!: number;
recipe$?: Observable<Recipe[]>;
url: string = this.router.url;

ngOnInit(): void {
  let recipeArray: number[] = [Number(this.recipeID)];
  this.recipe$ = this.recipeService.getRecipeCards({ recipeIDs: recipeArray }).pipe(filter(Boolean), tap(recipe => this.titleService.setTitle(`The Berbakery! - ${recipe[0].recipeName}`)));
}

printMethod(): void {
  window.print();
}

shareMethod(): void {
  navigator.share({url: this.url });
}

backMethod(): void {
  this.router.navigate(['/']);
}

}
