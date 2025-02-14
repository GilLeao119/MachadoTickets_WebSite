import { TestBed } from '@angular/core/testing';

import { AuthRestServiceService } from './auth-rest-service.service';

describe('AuthRestServiceService', () => {
  let service: AuthRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
