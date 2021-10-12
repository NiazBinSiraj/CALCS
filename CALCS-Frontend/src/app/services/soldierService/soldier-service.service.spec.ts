import { TestBed } from '@angular/core/testing';

import { SoldierServiceService } from './soldier-service.service';

describe('SoldierServiceService', () => {
  let service: SoldierServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldierServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
