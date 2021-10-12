import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryNewSoldiersComponent } from './entry-new-soldiers.component';

describe('EntryNewSoldiersComponent', () => {
  let component: EntryNewSoldiersComponent;
  let fixture: ComponentFixture<EntryNewSoldiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryNewSoldiersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryNewSoldiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
