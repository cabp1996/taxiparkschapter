import { Component, OnInit } from '@angular/core';
import {
  Ride,
  Skill,
  TableConfig,
  TopDriver,
} from '../../../shared/interfaces';
import { topDriversData } from '../../../shared/utils/consts/top-drivers.data';
import { skillsData } from '../../../shared/utils/consts/skills.data';
import { RideService } from '../../../rides/services/ride.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  skills: Skill[] = skillsData;
  topDrivers: TopDriver[] = topDriversData;

  driversTableConfig: TableConfig = {
    columns: [
      {
        header: 'User',
        width: '30%',
      },
      {
        header: 'Car Comfort',
        width: '10%',
      },
      {
        header: 'Ordered Time',
        width: '10%',
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
    rows: [
      {
        rowItems: [
          {
            user: {
              avatar: 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
              name: 'Sierra Ferguson',
              phone: '+998 (99) 436-46-15',
            },
          },
          {
            text: 'simple',
          },
          {
            text: '04.12.2021 20:30',
          },
          {
            text: 'пл. Беш Агач, Furkat Street, Tashkent, Oʻzbekiston',
          },
          {
            text: 'пл. Беш Агач, Furkat Street, Tashkent, Oʻzbekiston',
          },
          {
            text: '50 300 000 SUM',
            showAsBadge: true,
          },
        ],
      },
      {
        rowItems: [
          {
            user: {
              avatar: 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
              name: 'Sierra Ferguson',
              phone: '+998 (99) 436-46-15',
            },
          },
          {
            text: 'simple',
          },
          {
            text: '04.12.2021 20:30',
          },
          {
            text: 'пл. Беш Агач, Furkat Street, Tashkent, Oʻzbekiston',
          },
          {
            text: 'пл. Беш Агач, Furkat Street, Tashkent, Oʻzbekiston',
          },
          {
            text: '50 300 000 SUM',
            showAsBadge: true,
          },
        ],
      },
    ],
  };

  constructor(
    private readonly _rideService: RideService,
    private readonly _datePipe: DatePipe,
    private readonly _currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.getRides();
  }

  getRides(): void {
    this._rideService.getRides().subscribe((data) => {
      this.fillRidesTable(data);
    });
  }

  fillRidesTable(rides: Ride[]) {
    this.driversTableConfig.rows = rides.map((ride) => {
      return {
        id: ride.id,
        rowItems: [
          {
            user: {
              avatar: 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
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
          },
        ],
      };
    });
  }
}
