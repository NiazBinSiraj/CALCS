import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerTabComponent } from './officer-tab.component';

describe('OfficerTabComponent', () => {
  let component: OfficerTabComponent;
  let fixture: ComponentFixture<OfficerTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
