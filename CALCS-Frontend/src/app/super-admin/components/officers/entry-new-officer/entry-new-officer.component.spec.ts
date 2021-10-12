import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryNewOfficerComponent } from './entry-new-officer.component';

describe('EntryNewOfficerComponent', () => {
  let component: EntryNewOfficerComponent;
  let fixture: ComponentFixture<EntryNewOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryNewOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryNewOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
