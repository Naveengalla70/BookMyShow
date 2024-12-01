import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminhalllistComponent } from './adminhalllist.component';

describe('AdminhalllistComponent', () => {
  let component: AdminhalllistComponent;
  let fixture: ComponentFixture<AdminhalllistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminhalllistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminhalllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
