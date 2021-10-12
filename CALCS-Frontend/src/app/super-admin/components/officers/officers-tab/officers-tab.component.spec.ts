import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersTabComponent } from './officers-tab.component';

describe('OfficersTabComponent', () => {
  let component: OfficersTabComponent;
  let fixture: ComponentFixture<OfficersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficersTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
