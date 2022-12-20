import { TestBed } from '@angular/core/testing';

import { MockProjectService } from './mock-project.service';

describe('MockProjectService', () => {
  let service: MockProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
