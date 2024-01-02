import { Component, ViewChild, inject } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RecipeSearchComponent } from './child-components/recipe-search/recipe-search.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { BreakpointObserver, BreakpointState, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule, MatButtonModule, RecipeSearchComponent, MatMenuModule, LayoutModule],
  providers: [MatMenuTrigger],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  breakpointObserver = inject(BreakpointObserver).observe(Breakpoints.Small).pipe(takeUntilDestroyed()).subscribe((width: BreakpointState) => width.matches ? this.trigger?.closeMenu(): null);
}
