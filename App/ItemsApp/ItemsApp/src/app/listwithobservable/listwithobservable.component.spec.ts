import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListwithobservableComponent } from './listwithobservable.component';

describe('ListwithobservableComponent', () => {
  let component: ListwithobservableComponent;
  let fixture: ComponentFixture<ListwithobservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListwithobservableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListwithobservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
