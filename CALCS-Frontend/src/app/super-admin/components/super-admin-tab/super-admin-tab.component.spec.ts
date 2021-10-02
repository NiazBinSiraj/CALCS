import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminTabComponent } from './super-admin-tab.component';

describe('SuperAdminTabComponent', () => {
  let component: SuperAdminTabComponent;
  let fixture: ComponentFixture<SuperAdminTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
