import { Component } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './slide-animation';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  title = 'TheBerbakery';
}
