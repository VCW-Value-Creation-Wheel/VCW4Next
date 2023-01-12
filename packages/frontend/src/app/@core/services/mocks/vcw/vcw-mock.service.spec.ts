import { TestBed } from '@angular/core/testing';

import { VcwMockService } from './vcw-mock.service';

describe('VcwMockService', () => {
  let service: VcwMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcwMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
