import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListwithasyncpipeComponent } from './listwithasyncpipe.component';

describe('ListwithasyncpipeComponent', () => {
  let component: ListwithasyncpipeComponent;
  let fixture: ComponentFixture<ListwithasyncpipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListwithasyncpipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListwithasyncpipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
