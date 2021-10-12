import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSoldiersComponent } from './view-soldiers.component';

describe('ViewSoldiersComponent', () => {
  let component: ViewSoldiersComponent;
  let fixture: ComponentFixture<ViewSoldiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSoldiersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSoldiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
