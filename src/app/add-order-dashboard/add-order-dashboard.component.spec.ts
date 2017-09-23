import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderDashboardComponent } from './add-order-dashboard.component';

describe('AddOrderDashboardComponent', () => {
  let component: AddOrderDashboardComponent;
  let fixture: ComponentFixture<AddOrderDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
