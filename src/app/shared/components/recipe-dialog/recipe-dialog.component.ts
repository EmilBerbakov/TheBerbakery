import { Component, Inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Title } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatListModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss']
})
export class RecipeDialogComponent implements OnDestroy {

  oldTitle: string;
  url: string;

  constructor (@Inject(MAT_DIALOG_DATA) public data: Recipe,
               private titleService: Title,
               private router: Router) {
                this.oldTitle = this.titleService.getTitle();
                this.titleService.setTitle(`The Berbakery! - ${data.recipeName}`);
                this.url = this.router.url;
               }

  printMethod(): void {
    window.print();
  }

  shareMethod(): void {
    navigator.share({url: this.url });
  }

  ngOnDestroy(): void {
      this.titleService.setTitle(this.oldTitle);
  }


}
