import { TestBed } from '@angular/core/testing';

import { PhaseNavigationService } from './phase-navigation.service';

describe('PhaseNavigationService', () => {
  let service: PhaseNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaseNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
