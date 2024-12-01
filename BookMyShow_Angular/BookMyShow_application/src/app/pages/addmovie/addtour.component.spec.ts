import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieComponent } from './addmovie.component';

describe('AddtourComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
