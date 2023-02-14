import { TestBed } from '@angular/core/testing';

import { VcwPhasesService } from './vcw-phases.service';

describe('VcwPhasesService', () => {
  let service: VcwPhasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcwPhasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
