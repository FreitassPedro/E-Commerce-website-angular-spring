import { TestBed } from '@angular/core/testing';

import { OwnFormServiceService } from './own-form-service.service';

describe('OwnFormServiceService', () => {
  let service: OwnFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
