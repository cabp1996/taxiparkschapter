import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';

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

describe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(AuthInterceptor);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('it adds Authorization header for requests other than login and Cloudinary endpoints', () => {
    const jwtToken: string = 'jwtToken';
    const mockRequest = new HttpRequest(
      'GET',
      'server/api/client'
    );
    const mockNext = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.get('Authorization')).toBeDefined();
        expect(req.headers.get('Authorization')).toEqual(jwtToken);
        return new Observable<HttpEvent<any>>();
      },
    };

    setSessionStorage('token', jwtToken);

    interceptor.intercept(mockRequest, mockNext);
  });

  it('id does not add Authorization header for Cloudinary endpoints', () => {
    const mockRequest = new HttpRequest(
      'GET',
      'https://api.cloudinary.com/v1/images'
    );
    const mockNext = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.get('Authorization')).toBeNull();
        return new Observable<HttpEvent<any>>();
      },
    };

    interceptor.intercept(mockRequest, mockNext);
  });

  it('it does not add Authorization header for login endpoint', () => {
    const mockRequest = new HttpRequest('POST' as any, 'server/api/login');
    const mockNext = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.get('Authorization')).toBeNull();
        return new Observable<HttpEvent<any>>();
      }
    };

    interceptor.intercept(mockRequest, mockNext);
  });

  it('it clones the request with Authorization header for non-login endpoints', () => {
    const jwtToken: string = 'jwtToken';
    const mockRequest = new HttpRequest(
      'GET',
      'server/api/clients'
    );
    const mockNext = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.get('Authorization')).toBeDefined();
        expect(req.headers.get('Authorization')).toEqual(jwtToken);
        expect(req).not.toBe(mockRequest);
        return new Observable<HttpEvent<any>>();
      },
    };

    setSessionStorage('token', jwtToken);

    interceptor.intercept(mockRequest, mockNext);
  });
});
