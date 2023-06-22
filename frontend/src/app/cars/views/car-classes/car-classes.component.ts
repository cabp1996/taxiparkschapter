import { Component, OnInit, ViewChild } from '@angular/core';
import { CarClass, TableConfig } from '../../../shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { AlertConfirmationComponent } from '../../../shared/components/alert-confirmation/alert-confirmation.component';

@Component({
  selector: 'app-car-classes',
  templateUrl: './car-classes.component.html',
  styleUrls: ['./car-classes.component.scss'],
})
export class CarClassesComponent implements OnInit {
  carsTableConfig: TableConfig = {
    columns: [
      {
        header: 'Car class name',
        width: '30%',
      },
      {
        header: 'Starting Value',
        width: '12%',
      },
      {
        header: 'Free Km',
        width: '12%',
      },
      {
        header: 'Per km value',
        width: '12%',
      },
      {
        header: 'Waiting time',
        width: '12%',
      },
      {
        header: '',
        width: '10%',
      },
    ],
    rows: [],
  };

  carClasses: CarClass[] = [];
  carClassForm!: FormGroup;
  currentCarClass: CarClass | null = null;

  isModalOpen: boolean = false;

  @ViewChild('modalConfirmationAlert')
  modalConfirmationAlert!: AlertConfirmationComponent;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _carclassService: CarService
  ) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.carClassForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      lightning: [false, [Validators.required]],
      delivery: [false, [Validators.required]],
      startingValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      freeKm: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      perKmValue: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      perMinuteValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      waitingTime: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      outOfBranch: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit(): void {
    this.getCarClasses();
  }

  getCarClasses(): void {
    this._carclassService.getCarClasses().subscribe((data) => {
      this.carClasses = [...data];
      this.fillCarsTable(data);
    });
  }

  fillCarsTable(carClassesData: CarClass[]): void {
    this.carsTableConfig.rows = carClassesData.map((car) => {
      return {
        id: car.id?.toString(),
        rowItems: [
          {
            text: car.name,
          },
          {
            text: car.startingValue.toString(),
          },
          {
            text: car.freeKm.toString() + ' km',
          },
          {
            text: car.perKmValue.toString(),
          },
          {
            text: car.outOfBranch.toString(),
          },
          {
            actions: [
              {
                icon: 'fa fa-pencil',
                callback: () => {
                  this.startEditingCarclass(car.id!);
                },
              },
              {
                icon: 'fa fa-trash',
                callback: () => {
                  this.deleteCarClass(car.id!);
                },
              },
            ],
          },
        ],
      };
    });
  }

  startEditingCarclass(id: number): void {
    this.currentCarClass = this.carClasses.find(
      (carClass) => carClass.id === id
    )!;

    const {
      name,
      lightning,
      delivery,
      freeKm,
      outOfBranch,
      perKmValue,
      startingValue,
      waitingTime,
      perMinuteValue,
    } = this.currentCarClass;

    this.carClassForm.setValue({
      name,
      startingValue,
      lightning,
      delivery,
      freeKm,
      perKmValue,
      perMinuteValue,
      waitingTime,
      outOfBranch,
    });

    this.openCarModal(true);
  }

  async deleteCarClass(id: number): Promise<void> {
    const response = await this.modalConfirmationAlert.confirmOperation();
    if (response) {
      this._carclassService.deleteCarClass(id).subscribe(() => {
        this.getCarClasses();
      });
    }
  }

  openCarModal(isToUpdate: boolean): void {
    if (!isToUpdate) {
      this._resetForm();
    }
    this.isModalOpen = true;
  }

  closeCarModal(): void {
    this.currentCarClass = null;
    this.isModalOpen = false;
  }

  saveCarClass(): void {
    const {
      name,
      startingValue,
      freeKm,
      lightning,
      delivery,
      perKmValue,
      perMinuteValue,
      waitingTime,
      outOfBranch,
    } = this.carClassForm.value;

    const carClass: CarClass = {
      name,
      lightning,
      delivery,
      freeKm,
      perKmValue,
      outOfBranch,
      waitingTime,
      startingValue,
      perMinuteValue,
    };

    if (this.currentCarClass) {
      this._carclassService
        .updateCarclass(this.currentCarClass.id!, carClass)
        .subscribe((_) => {
          this._doOnSuccessRequest();
        });
    } else {
      this._carclassService.createCarClass(carClass).subscribe((_) => {
        this._doOnSuccessRequest();
      });
    }
  }

  get isSubmitButtonDisabled(): boolean {
    return this.carClassForm.invalid;
  }

  private _doOnSuccessRequest(): void {
    this.carClassForm.reset('');
    this.getCarClasses();
    this.closeCarModal();
  }

  private _resetForm(): void {
    this.carClassForm.reset({
      name: '',
      lightning: false,
      delivery: false,
      startingValue: '',
      freeKm: '',
      perKmValue: '',
      perMinuteValue: '',
      waitingTime: '',
      outOfBranch: '',
    });
    this.currentCarClass = null;
  }
}
