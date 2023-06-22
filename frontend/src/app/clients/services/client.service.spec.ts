import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Client } from '../../shared/interfaces';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

  it('createClient makes a POST request and return an observable of client Interface', () => {
    const client: Client = {
      fileUrl: '',
      homeLocation: 'home',
      lastName: 'lastName',
      name: 'name',
      phone: '12345678',
      totalFinished: 0,
      totalRides: 0,
      workLocation: 'work',
    };

    const apiUrl = `${service.API_BASE_URL}`;

    service.createClient(client).subscribe((result) => {
      expect(result).toEqual(client);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(client);
    req.flush(client);
  });

  it('deleteClient makes a DELETE request and return an observable of void', () => {
    const id = 1;
    const apiUrl = `${service.API_BASE_URL}/${id}`;
    service.deleteClient(id).subscribe((result) => {
      expect(result).toBeUndefined();
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('updateClient makes a PUT request and return an observable of client', () => {
    const id = 1;

    const client: Client = {
      fileUrl: '',
      homeLocation: 'home',
      lastName: 'lastName',
      name: 'name',
      phone: '12345678',
      totalFinished: 0,
      totalRides: 0,
      workLocation: 'work',
    };

    const apiUrl = `${service.API_BASE_URL}/${id}`;
    service.updateClient(id, client).subscribe((result) => {
      expect(result).toEqual(client);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('PUT');
    req.flush(client);
  });

  it('getAllClients makes a GET request and return an observable of list client Interface', () => {
    const clients: Client[] = [
      {
        fileUrl: '',
        homeLocation: 'home',
        lastName: 'lastName',
        name: 'name',
        phone: '12345678',
        totalFinished: 0,
        totalRides: 0,
        workLocation: 'work',
      },
    ];

    const apiUrl = `${service.API_BASE_URL}`;

    service.getAllClients().subscribe((result) => {
      expect(result).toEqual(clients);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(clients);
  });
});
