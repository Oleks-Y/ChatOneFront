import { TestBed } from '@angular/core/testing';

import { GetAccsService } from './get-accs.service';

describe('GetAccsService', () => {
  let service: GetAccsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAccsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
