import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerksInfoComponent } from './clerks-info.component';

describe('ClerksInfoComponent', () => {
  let component: ClerksInfoComponent;
  let fixture: ComponentFixture<ClerksInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerksInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerksInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
