import { TestBed } from '@angular/core/testing';

import { ValueTableService } from './value-table.service';

describe('ValueTableService', () => {
  let service: ValueTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
