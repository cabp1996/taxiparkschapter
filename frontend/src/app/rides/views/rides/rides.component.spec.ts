import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesComponent } from './rides.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FilterComponent } from '../../components/filter/filter.component';
import { SharedModule } from '../../../shared/shared.module';
import { RideService } from '../../services/ride.service';
import { TimelineService } from '../../../shared/services';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('RidesComponent', () => {
  let component: RidesComponent;
  let fixture: ComponentFixture<RidesComponent>;
  let ridesService: RideService;
  let timelimeService: TimelineService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule],
      declarations: [RidesComponent, FilterComponent],
      providers: [DatePipe, CurrencyPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    ridesService = TestBed.inject(RideService);
    timelimeService = TestBed.inject(TimelineService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.spyOn(ridesService, 'getRides').mockReturnValue(
      of([
        {
          id: '1',
          userName: '1',
          userPhone: '1',
          carComfort: '1',
          orderedTime: '1',
          startLocation: '1',
          finishLocation: '1',
          income: '1',
          reason: '1',
          status: 'Pending',
        },
      ])
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRides initialize filters and fills table', () => {
    component.getRides();

    expect(component.ridesFilters[0].total).toEqual(1);
    expect(component.rides.length).toBeGreaterThan(0);
  });

  it('onClickRow sets ride in timeline', () => {
    const spy = jest.spyOn(timelimeService, 'setRide');
    component.getRides();
    component.onClickRow({
      id: '1',
      rowItems: [],
    });

    expect(spy).toHaveBeenCalled();
  });

  it('totalRows returns the number of rows of table', () => {
    component.rides = [
      {
        id: '1',
        userName: '1',
        userPhone: '1',
        carComfort: '1',
        orderedTime: '1',
        startLocation: '1',
        finishLocation: '1',
        income: '1',
        reason: '1',
        status: 'Pending',
      },
    ];

    component.filterTable('Pending');

    const result = component.totalRows;
    expect(result).toEqual(component.rides.length);
  });
});
