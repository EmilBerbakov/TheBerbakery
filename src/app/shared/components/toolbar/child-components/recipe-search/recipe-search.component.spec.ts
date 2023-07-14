import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSearchComponent } from './recipe-search.component';

describe('RecipeSearchComponent', () => {
  let component: RecipeSearchComponent;
  let fixture: ComponentFixture<RecipeSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecipeSearchComponent]
    });
    fixture = TestBed.createComponent(RecipeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
