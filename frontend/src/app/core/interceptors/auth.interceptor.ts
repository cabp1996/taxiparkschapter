import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isCloudinaryEndpoint: boolean =
      req.url.includes('api.cloudinary.com');

    if (isCloudinaryEndpoint) {
      return next.handle(req);
    }

    const isLoginOrInitEndpoint: boolean = req.url.split('/').some((token) => {
      return token === 'login' || token === 'init';
    });

    if (!isLoginOrInitEndpoint) {
      const authToken = sessionStorage.getItem('token') as string;

      const headers = new HttpHeaders({
        Authorization: authToken,
      });

      const reqClon = req.clone({ headers });
      return next.handle(reqClon);
    }

    return next.handle(req);
  }
}
