import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulCheckoutModalComponent } from './successful-checkout-modal.component';

describe('SuccessfulCheckoutModalComponent', () => {
  let component: SuccessfulCheckoutModalComponent;
  let fixture: ComponentFixture<SuccessfulCheckoutModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulCheckoutModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulCheckoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
