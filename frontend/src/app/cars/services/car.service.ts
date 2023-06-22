import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarClass } from 'src/app/shared/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  readonly API_BASE_URL: string = environment.apiUrl + '/carclass';

  constructor(private readonly _http: HttpClient) {}

  getCarClasses(): Observable<CarClass[]> {
    return this._http.get<CarClass[]>(this.API_BASE_URL);
  }

  createCarClass(carclass: CarClass): Observable<CarClass> {
    return this._http.post<CarClass>(this.API_BASE_URL, carclass);
  }

  deleteCarClass(id: number): Observable<void> {
    return this._http.delete<void>(`${this.API_BASE_URL}/${id}`);
  }

  updateCarclass(id: number, carclass: CarClass): Observable<CarClass> {
    return this._http.put<CarClass>(`${this.API_BASE_URL}/${id}`, carclass);
  }
}
