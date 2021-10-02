import { TestBed } from '@angular/core/testing';

import { ClerkServiceService } from './clerk-service.service';

describe('ClerkServiceService', () => {
  let service: ClerkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClerkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
