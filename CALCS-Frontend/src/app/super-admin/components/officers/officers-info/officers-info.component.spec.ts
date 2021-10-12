import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersInfoComponent } from './officers-info.component';

describe('OfficersInfoComponent', () => {
  let component: OfficersInfoComponent;
  let fixture: ComponentFixture<OfficersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficersInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
