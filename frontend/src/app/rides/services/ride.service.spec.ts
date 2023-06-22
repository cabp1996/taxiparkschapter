import { TestBed } from '@angular/core/testing';

import { RideService } from './ride.service';
import { HttpClientModule } from '@angular/common/http';

describe('RideService', () => {
  let service: RideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
