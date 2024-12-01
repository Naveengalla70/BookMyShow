import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserhalllistComponent } from './userhalllist.component';

describe('UserhalllistComponent', () => {
  let component: UserhalllistComponent;
  let fixture: ComponentFixture<UserhalllistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserhalllistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserhalllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
