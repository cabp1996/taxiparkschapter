import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Shift } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  readonly API_BASE_URL: string = environment.apiUrl + '/shift';

  constructor(private readonly _http: HttpClient) {}

  getShifts(): Observable<Shift[]> {
    return this._http.get<Shift[]>(this.API_BASE_URL);
  }

  payShift(shift: Shift): Observable<Shift> {
    return this._http.post<Shift>(this.API_BASE_URL, shift);
  }

  updateShift(id: number, shift: Shift): Observable<Shift> {
    return this._http.put<Shift>(`${this.API_BASE_URL}/${id}`, shift);
  }

  deleteShift(id: number): Observable<void> {
    return this._http.delete<void>(`${this.API_BASE_URL}/${id}`);
  }
}
