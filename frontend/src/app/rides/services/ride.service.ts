import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ride } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  readonly API_BASE_URL: string = environment.apiUrl + '/ride';

  constructor(private readonly _http: HttpClient) {}

  getRides(): Observable<Ride[]> {
    return this._http.get<Ride[]>(this.API_BASE_URL);
  }
}
