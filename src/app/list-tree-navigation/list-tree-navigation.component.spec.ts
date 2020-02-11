import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTreeNavigationComponent } from './list-tree-navigation.component';

describe('ListTreeNavigationComponent', () => {
  let component: ListTreeNavigationComponent;
  let fixture: ComponentFixture<ListTreeNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTreeNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTreeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
