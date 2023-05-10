import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
//TODO - oninit, this will run the get recipe card service on x random recipe ids
//TODO - within home, we will have x recipe cards that will take in a specific recipe card
export class HomeComponent {

}
