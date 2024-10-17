import { TestBed } from '@angular/core/testing';

import { baseservice } from './base.service';

describe('baseservice', () => {
  let service: baseservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(baseservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
