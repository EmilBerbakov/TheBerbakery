import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeImagesComponent } from './recipe-images.component';

describe('RecipeImagesComponent', () => {
  let component: RecipeImagesComponent;
  let fixture: ComponentFixture<RecipeImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecipeImagesComponent]
    });
    fixture = TestBed.createComponent(RecipeImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
