import { TestBed } from '@angular/core/testing';

import { ShiftService } from './shift.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Shift } from '../../shared/interfaces';

describe('ShiftService', () => {
  let service: ShiftService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ShiftService);
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('payShift makes a POST request and return an observable of shift Interface', () => {
    const shift: Shift = {
      isOut: false,
      name: 'name',
      perKm: '5',
      value: '5',
    };

    const apiUrl = `${service.API_BASE_URL}`;

    service.payShift(shift).subscribe((result) => {
      expect(result).toEqual(shift);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(shift);
    req.flush(shift);
  });

  it('deleteShift makes a DELETE request and return an observable of void', () => {
    const id = 1;
    const apiUrl = `${service.API_BASE_URL}/${id}`;
    service.deleteShift(id).subscribe((result) => {
      expect(result).toBeUndefined();
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('updateShift makes a PUT request and return an observable of shift', () => {
    const id = 1;

    const shift: Shift = {
      isOut: false,
      name: 'name',
      perKm: '5',
      value: '5',
    };

    const apiUrl = `${service.API_BASE_URL}/${id}`;
    service.updateShift(id, shift).subscribe((result) => {
      expect(result).toEqual(shift);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('PUT');
    req.flush(shift);
  });

  it('getShifts makes a GET request and return an observable of list shift Interface', () => {
    const shifts: Shift[] = [
      {
        id: 1,
        name: '2',
        perKm: '2',
        value: '2',
        isOut: false,
      },
      {
        id: 2,
        name: '2',
        perKm: '2',
        value: '2',
        isOut: true,
      },
    ];

    const apiUrl = `${service.API_BASE_URL}`;

    service.getShifts().subscribe((result) => {
      expect(result).toEqual(shifts);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(shifts);
  });
});
