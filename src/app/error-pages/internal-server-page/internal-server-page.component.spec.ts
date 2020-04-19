import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServerPageComponent } from './internal-server-page.component';

describe('InternalServerPageComponent', () => {
  let component: InternalServerPageComponent;
  let fixture: ComponentFixture<InternalServerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalServerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalServerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
