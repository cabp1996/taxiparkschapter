import { Injectable } from '@angular/core';
import { SnackbarMessage } from '../interfaces/snackbar.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackbarBehavior$ = new BehaviorSubject<SnackbarMessage>({
    message: '',
    type: 'success',
  });

  constructor() {}

  public showSnackbar(snackbarMessage: SnackbarMessage) {
    this.snackbarBehavior$.next(snackbarMessage);
  }
}
