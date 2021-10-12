import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldiersInfoComponent } from './soldiers-info.component';

describe('SoldiersInfoComponent', () => {
  let component: SoldiersInfoComponent;
  let fixture: ComponentFixture<SoldiersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldiersInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldiersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
