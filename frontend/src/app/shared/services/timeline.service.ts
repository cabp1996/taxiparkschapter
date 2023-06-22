import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ride } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  readonly EMPTY_RIDE: Ride = {
    carComfort: '',
    userName: '',
    userPhone: '',
    finishLocation: '',
    id: '',
    income: '',
    orderedTime: '',
    startLocation: '',
    reason: '',
    status: 'Pending',
  };

  ride: BehaviorSubject<Ride> = new BehaviorSubject<Ride>(this.EMPTY_RIDE);

  constructor() {}

  setRide(ride: Ride) {
    this.ride.next(ride);
  }

  removeRide() {
    this.ride.next(this.EMPTY_RIDE);
  }
}
