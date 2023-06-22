import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moderator } from '../../shared/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModeratorService {
  readonly API_BASE_URL: string = environment.apiUrl + '/moderator';

  constructor(private readonly _http: HttpClient) {}

  getModerators(): Observable<Moderator[]> {
    return this._http.get<Moderator[]>(this.API_BASE_URL);
  }

  createModerator(moderator: Moderator): Observable<Moderator> {
    return this._http.post<Moderator>(this.API_BASE_URL, moderator);
  }
}
