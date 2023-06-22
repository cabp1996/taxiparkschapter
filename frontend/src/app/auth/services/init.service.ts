import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  readonly API_BASE_URL: string = environment.apiUrl + '/init';

  constructor(private readonly _http: HttpClient) {}

  initData(): Observable<void> {
    return this._http.get<void>(this.API_BASE_URL);
  }
}
