import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryNewClerkComponent } from './entry-new-clerk.component';

describe('EntryNewClerkComponent', () => {
  let component: EntryNewClerkComponent;
  let fixture: ComponentFixture<EntryNewClerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryNewClerkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryNewClerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
