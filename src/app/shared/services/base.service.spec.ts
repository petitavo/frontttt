import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseService);
=======
import { baseservice } from './base.service';

describe('baseservice', () => {
  let service: baseservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(baseservice);
>>>>>>> develop
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
