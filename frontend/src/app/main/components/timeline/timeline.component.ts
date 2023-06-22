import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ride } from '../../../shared/interfaces';
import { TimelineService } from '../../../shared/services';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, OnDestroy {
  @Output() onShowTimeline = new EventEmitter<boolean>();

  timelineRide!: Ride;
  showTimeline: boolean = false;

  private _onDestroy$ = new Subject();

  constructor(private readonly _timelineService: TimelineService) {}

  ngOnInit(): void {
    this.onRideChange();
  }

  onRideChange(): void {
    this._timelineService.ride
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((ride) => {
        if (!ride.id) {
          this.showTimeline = false;
          return;
        }

        this.timelineRide = { ...ride };
        this.showTimeline = true;
      });
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  removeListeners(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
