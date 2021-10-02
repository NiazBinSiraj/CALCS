import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerksTabComponent } from './clerks-tab.component';

describe('ClerksTabComponent', () => {
  let component: ClerksTabComponent;
  let fixture: ComponentFixture<ClerksTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerksTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerksTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
