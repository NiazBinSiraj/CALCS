import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonourBoardComponent } from './honour-board.component';

describe('HonourBoardComponent', () => {
  let component: HonourBoardComponent;
  let fixture: ComponentFixture<HonourBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HonourBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HonourBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
