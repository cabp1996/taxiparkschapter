import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../shared/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  readonly API_BASE_URL: string = environment.apiUrl + '/client';

  constructor(private readonly _http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this._http.get<Client[]>(this.API_BASE_URL);
  }

  createClient(client: Client): Observable<Client> {
    return this._http.post<Client>(this.API_BASE_URL, client);
  }

  deleteClient(id: number): Observable<void> {
    return this._http.delete<void>(`${this.API_BASE_URL}/${id}`);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this._http.put<Client>(`${this.API_BASE_URL}/${id}`, client);
  }
}
