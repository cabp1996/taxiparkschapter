import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const sessionStorageMock = (function () {
  let store = {} as any;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: any) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

const setSessionStorage = (id: string, data: string) => {
  window.sessionStorage.setItem(id, data);
};

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('login makes a POST request to login API and save the token', () => {
    const spyStorage = jest.spyOn(sessionStorageMock, 'setItem');
    const mockResponse = {
      ok: 200,
    };

    const loginCredentials = {
      phone: '123456789',
      password: 'Cesar123@',
    };

    service.login(loginCredentials).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
      expect(spyStorage).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`${service.API_BASE_URL}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginCredentials);

    req.flush(mockResponse, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwOTg3NjU0MzIxIiwiZXhwIjoxNjg3MDIxMTA5LCJwaG9uZSI6IjA5ODc2NTQzMjEiLCJuYW1lIjoiQ2VzYXIgQmFsY2F6YXIifQ.L_v6VxGMJjaz9WYVS29-H1D9Tl3bbHhmgQeGNxRn_-g',
      },
    });
  });

  it('logout cleans session storage', () => {
    const spy = jest.spyOn(sessionStorage, 'clear');
    service.logout();
    expect(spy).toHaveBeenCalled();
  });

  it('login makes a POST request to login API and not call the storage if theres no token', () => {
    const spyStorage = jest.spyOn(sessionStorageMock, 'setItem');
    const mockResponse = {
      ok: 200,
    };

    const loginCredentials = {
      phone: '123456789',
      password: 'Cesar123@',
    };

    service.login(loginCredentials).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
      expect(spyStorage).not.toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`${service.API_BASE_URL}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginCredentials);

    req.flush(mockResponse);
  });
});
