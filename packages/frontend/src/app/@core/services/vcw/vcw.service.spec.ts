import { TestBed } from '@angular/core/testing';

import { VcwService } from './vcw.service';

describe('VcwService', () => {
  let service: VcwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
