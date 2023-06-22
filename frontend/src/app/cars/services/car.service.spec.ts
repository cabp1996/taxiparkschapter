import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CarClass } from '../../shared/interfaces';

describe('CarService', () => {
  let service: CarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CarService);
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('created', () => {
    expect(service).toBeTruthy();
  });

  it('Make a POST request and return an observable of Car Interface', () => {
    const carClass: CarClass = {
      id: 1,
      name: 'Compact',
      freeKm: 1,
      outOfBranch: 1,
      perKmValue: 1,
      startingValue: 1,
      delivery: false,
      lightning: false,
      perMinuteValue: 1,
      waitingTime: 1,
    };

    const apiUrl = `${service.API_BASE_URL}`;

    service.createCarClass(carClass).subscribe((result) => {
      expect(result).toEqual(carClass);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(carClass);
    req.flush(carClass);
  });

  it('Make a DELETE request and return an observable of void', () => {
    const id = 1;
    const apiUrl = `${service.API_BASE_URL}/${id}`;
    service.deleteCarClass(id).subscribe((result) => {
      expect(result).toBeUndefined();
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('Make a PUT request and return an observable of Car interface', () => {
    const id = 1;

    const carClass: CarClass = {
      id,
      name: 'Compact',
      freeKm: 1,
      outOfBranch: 1,
      perKmValue: 1,
      startingValue: 1,
      waitingTime: 1,
      delivery: false,
      lightning: false,
      perMinuteValue: 1,
    };

    const apiUrl = `${service.API_BASE_URL}/${id}`;
    service.updateCarclass(id, carClass).subscribe((result) => {
      expect(result).toEqual(carClass);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });
});
