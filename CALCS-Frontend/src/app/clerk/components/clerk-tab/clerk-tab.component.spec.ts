import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkTabComponent } from './clerk-tab.component';

describe('ClerkTabComponent', () => {
  let component: ClerkTabComponent;
  let fixture: ComponentFixture<ClerkTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
