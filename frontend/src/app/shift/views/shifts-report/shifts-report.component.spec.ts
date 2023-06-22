import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsReportComponent } from './shifts-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ShiftService } from '../../services/shift.service';
import { of } from 'rxjs';

describe('ShiftsReportComponent', () => {
  let component: ShiftsReportComponent;
  let fixture: ComponentFixture<ShiftsReportComponent>;
  let shiftService: ShiftService;
  let mockShifts = [
    {
      id: 1,
      name: '2',
      perKm: '2',
      value: '2',
      isOut: false,
    },
    {
      id: 2,
      name: '2',
      perKm: '2',
      value: '2',
      isOut: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftsReportComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    shiftService = TestBed.inject(ShiftService);
  });

  beforeEach(() => {
    jest.spyOn(shiftService, 'getShifts').mockReturnValue(of(mockShifts));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getShifts fill shifts data', () => {
    component.getShifts();
    expect(component.shifts.length).toEqual(mockShifts.length);
  });

  it('clicking row actions call their respective functions', () => {
    const spyStartEdit = jest.spyOn(component, 'initializeShiftUpdate');
    const spyDelete = jest.spyOn(component, 'removeShift');
    component.getShifts();

    const firstRowItems = component.shiftsTableConfig.rows[0].rowItems;
    const editOption = firstRowItems[firstRowItems.length - 1].actions![0];
    const deleteOption = firstRowItems[firstRowItems.length - 1].actions![1];

    editOption.callback();
    deleteOption.callback();

    expect(spyStartEdit).toHaveBeenCalled();
    expect(spyDelete).toHaveBeenCalled();
  });

  it('removeShift call get shifts to refresh data', () => {
    jest.spyOn(shiftService, 'deleteShift').mockReturnValue(of(undefined));
    const spy = jest.spyOn(component, 'getShifts');
    component.removeShift(1);
    expect(spy).toHaveBeenCalled();
  });

  it('pay updates shift and refresh form if is editing', () => {
    component.shiftForm.setValue({
      name: 'name',
      perKm: 'perKm',
      value: 'value',
    });

    component.currentShift = {
      isOut: false,
      name: 'name',
      perKm: 'perKm',
      value: 'value',
      id: 1,
    };

    jest.spyOn(shiftService, 'updateShift').mockReturnValue(
      of({
        isOut: false,
        name: 'nameE',
        perKm: 'perKmE',
        value: 'valueE',
        id: 1,
      })
    );

    const spyReset = jest.spyOn(component.shiftForm, 'reset');
    const spyGetShifts = jest.spyOn(component, 'getShifts');

    component.pay(false);

    expect(spyGetShifts).toHaveBeenCalled();
    expect(spyReset).toHaveBeenCalled();
  });

  it('pay creates shift and should refresh form if is not editing', () => {
    component.shiftForm.setValue({
      name: 'name',
      perKm: 'perKm',
      value: 'value',
    });

    component.currentShift = null;

    jest.spyOn(shiftService, 'payShift').mockReturnValue(
      of({
        isOut: false,
        name: 'nameE',
        perKm: 'perKmE',
        value: 'valueE',
        id: 1,
      })
    );

    const spyReset = jest.spyOn(component.shiftForm, 'reset');
    const spyGetShifts = jest.spyOn(component, 'getShifts');

    component.pay(false);

    expect(spyGetShifts).toHaveBeenCalled();
    expect(spyReset).toHaveBeenCalled();
  });
});
