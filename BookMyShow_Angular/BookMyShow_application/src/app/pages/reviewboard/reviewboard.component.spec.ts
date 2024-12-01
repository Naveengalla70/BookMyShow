import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewboardComponent } from './reviewboard.component';

describe('ReviewboardComponent', () => {
  let component: ReviewboardComponent;
  let fixture: ComponentFixture<ReviewboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
