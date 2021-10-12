import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldiersTabComponent } from './soldiers-tab.component';

describe('SoldiersTabComponent', () => {
  let component: SoldiersTabComponent;
  let fixture: ComponentFixture<SoldiersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldiersTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldiersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
