import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ride, TableConfig, TableRow } from '../../../shared/interfaces';
import { TimelineService } from '../../../shared/services';
import { RideService } from '../../services/ride.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.scss'],
})
export class RidesComponent implements OnInit, OnDestroy {
  ridesTableConfig: TableConfig = {
    columns: [
      {
        header: 'User',
        width: '25%',
      },
      {
        header: 'Car Comfort',
        width: '10%',
      },
      {
        header: 'Ordered Time',
        width: '15%',
      },
      {
        header: 'Start location',
        width: '20%',
      },
      {
        header: 'Finish Location',
        width: '20%',
      },
      {
        header: 'Income',
        width: '10%',
      },
    ],
    rows: [],
  };

  ridesFilters: { key: string; total: number }[] = [];
  rides: Ride[] = [];

  constructor(
    private readonly _timelineService: TimelineService,
    private readonly _rideService: RideService,
    private readonly _datePipe: DatePipe,
    private readonly _currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.getRides();
  }

  getRides(): void {
    this._rideService.getRides().subscribe((data) => {
      this.rides = [...data];
      this.filterTable('Pending');
      this.initializeFilters();
    });
  }

  initializeFilters() {
    this.ridesFilters = [
      this._countTotalByStatus('Pending'),
      this._countTotalByStatus('In Progress'),
      this._countTotalByStatus('Completed'),
      this._countTotalByStatus('Upcoming'),
      this._countTotalByStatus('Pre cancelled'),
      this._countTotalByStatus('Cancelled by driver'),
      this._countTotalByStatus('Done'),
    ];
  }

  filterTable(status: string) {
    this.ridesTableConfig.rows = this.rides
      .filter((ride) => ride.status === status)
      .map((ride) => {
        return {
          id: ride.id,
          rowItems: [
            {
              user: {
                avatar:
                  'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
                name: ride.userName,
                phone: ride.userPhone,
              },
            },
            {
              text: ride.carComfort,
            },
            {
              text:
                this._datePipe.transform(
                  ride.orderedTime,
                  'MMM d, y, h:mm:ss a'
                ) || '-',
            },
            {
              text: ride.startLocation,
            },
            {
              text: ride.finishLocation,
            },
            {
              text: this._currencyPipe.transform(ride.income, 'USD') || '-',
              showAsBadge: true,
            },
          ],
        };
      });
  }

  onClickRow({ id }: TableRow) {
    const foundRide = this.rides.find((ride) => ride.id === id!)!;
    this._timelineService.setRide(foundRide);
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  removeListeners(): void {
    this._timelineService.removeRide();
  }

  get totalRows(): number {
    return this.ridesTableConfig.rows.length;
  }

  private _countTotalByStatus(status: string): { key: string; total: number } {
    return {
      key: status,
      total: this.rides.filter((ride) => ride.status === status).length,
    };
  }
}
