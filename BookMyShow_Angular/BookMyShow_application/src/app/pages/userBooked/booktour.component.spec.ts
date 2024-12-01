import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookedComponent } from './booktour.component';

describe('BooktourComponent', () => {
  let component: UserBookedComponent;
  let fixture: ComponentFixture<UserBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBookedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
