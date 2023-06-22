import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarClassesComponent } from './car-classes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CarService } from '../../services/car.service';
import { of } from 'rxjs';
import { CarClass } from '../../../shared/interfaces';
import { AlertConfirmationComponent } from '../../../shared/components/alert-confirmation/alert-confirmation.component';

describe('CarClassesComponent', () => {
  let component: CarClassesComponent;
  let fixture: ComponentFixture<CarClassesComponent>;
  let carService: CarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarClassesComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    carService = TestBed.inject(CarService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('fill car classes data with service get of car classes', () => {
    jest.spyOn(carService, 'getCarClasses').mockReturnValue(
      of([
        {
          name: 'name',
          startingValue: 0,
          freeKm: 0,
          perKmValue: 0,
          waitingTime: 0,
          outOfBranch: 0,
          lightning: false,
          delivery: false,
          perMinuteValue: 1,
          id: 0,
        },
      ])
    );

    component.getCarClasses();

    expect(component.carClasses.length).toBeGreaterThan(0);
  });

  it('call options of rows call callbacks functions when they are clicked', () => {
    const spyStartEdit = jest.spyOn(component, 'startEditingCarclass');
    const spyDelete = jest
      .spyOn(component, 'deleteCarClass')
      .mockImplementationOnce((id: number) => Promise.resolve(undefined));
    component.carClasses = [
      {
        name: 'name',
        startingValue: 0,
        freeKm: 0,
        perKmValue: 0,
        waitingTime: 0,
        lightning: false,
        delivery: false,
        perMinuteValue: 1,
        outOfBranch: 0,
        id: 0,
      },
    ];

    component.fillCarsTable(component.carClasses);

    const firstRowItems = component.carsTableConfig.rows[0].rowItems;
    const editOption = firstRowItems[firstRowItems.length - 1].actions![0];
    const deleteOption = firstRowItems[firstRowItems.length - 1].actions![1];

    editOption.callback();
    deleteOption.callback();

    expect(spyStartEdit).toHaveBeenCalled();
    expect(spyDelete).toHaveBeenCalled();
  });

  it('closeCarModal set isModalOpen to false', () => {
    component.closeCarModal();
    expect(component.isModalOpen).toBeFalsy();
  });

  it('success delete car class call get car classes to refresh', async () => {
    const spyGet = jest.spyOn(component, 'getCarClasses');
    component.modalConfirmationAlert = new AlertConfirmationComponent();
    jest
      .spyOn(component.modalConfirmationAlert, 'confirmOperation')
      .mockResolvedValue(true);
    jest.spyOn(carService, 'deleteCarClass').mockReturnValue(of(undefined));
    await component.deleteCarClass(1);
    expect(spyGet).toHaveBeenCalled();
  });

  it('saveCarClass creates new car class when currentCarClass is not set', () => {
    const carClass: CarClass = {
      name: 'Test Car Class',
      freeKm: 100,
      perKmValue: 5,
      outOfBranch: 10,
      waitingTime: 15,
      startingValue: 20,
      perMinuteValue: 1,
      lightning: false,
      delivery: false,
    };

    const spyServiceCall = jest
      .spyOn(carService, 'createCarClass')
      .mockReturnValue(of(carClass));

    component.currentCarClass = null;
    component.carClassForm.setValue(carClass);
    component.saveCarClass();
    expect(spyServiceCall).toHaveBeenCalled();
  });

  it('saveCarClass updates a car class when currentCarClass is  set', () => {
    const carClass: CarClass = {
      name: 'Test Car Class',
      freeKm: 100,
      perKmValue: 5,
      outOfBranch: 10,
      waitingTime: 15,
      startingValue: 20,
      lightning: false,
      perMinuteValue: 1,
      delivery: false,
    };

    const spyServiceCall = jest
      .spyOn(carService, 'updateCarclass')
      .mockReturnValue(of(carClass));

    component.currentCarClass = { ...carClass, id: 1 };
    component.carClassForm.setValue(carClass);
    component.saveCarClass();
    expect(spyServiceCall).toHaveBeenCalled();
  });
});
