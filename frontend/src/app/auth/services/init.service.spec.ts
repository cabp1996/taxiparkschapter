import { TestBed } from '@angular/core/testing';

import { InitService } from './init.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InitService', () => {
  let service: InitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(InitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
