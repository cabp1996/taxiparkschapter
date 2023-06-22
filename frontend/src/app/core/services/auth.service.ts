import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Login, User } from '../../shared/interfaces';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_BASE_URL: string = environment.apiUrl;

  userToken: string = '';
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>({
    name: '',
    phone: '',
  });

  constructor(private readonly _http: HttpClient) {
    this._checkCurrentUser();
  }

  private _checkCurrentUser() {
    if (sessionStorage.getItem('token')) {
      this.userToken = sessionStorage.getItem('token')!;
      const user = JSON.parse(sessionStorage.getItem('currentUser')!) as User;
      this.currentUser.next(user);
    } else {
      this.userToken = '';
      this.currentUser.next({
        name: '',
        phone: '',
      });
    }
  }

  login(loginCredentials: Login): Observable<any> {
    return this._http
      .post(`${this.API_BASE_URL}/login`, loginCredentials, {
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const jwtToken = resp.headers.get('Authorization');
          this._saveToken(jwtToken);
          return resp;
        })
      );
  }

  logout(): void {
    this._cleanSession();
  }

  private _saveToken(token: string | null) {
    if (!token) return;

    this.userToken = token;

    const { name, phone } = jwt_decode(token) as {
      sub: string;
      exp: string;
      phone: string;
      name: string;
    };

    this.currentUser.next({
      name,
      phone,
    });

    sessionStorage.setItem(
      'currentUser',
      JSON.stringify(this.currentUser.getValue())
    );
    sessionStorage.setItem('token', token);
  }

  private _cleanSession(): void {
    sessionStorage.clear();
  }
}
