import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shift, TableConfig } from '../../../shared/interfaces';
import { ShiftService } from '../../services/shift.service';

@Component({
  selector: 'app-shifts-report',
  templateUrl: './shifts-report.component.html',
  styleUrls: ['./shifts-report.component.scss'],
})
export class ShiftsReportComponent implements OnInit {
  shiftsTableConfig: TableConfig = {
    columns: [
      {
        header: 'N°',
        width: '10%',
      },
      {
        header: 'Branche name',
        width: '30%',
      },
      {
        header: 'Free km',
        width: '50%',
      },
      {
        header: '',
        width: '10%',
      },
    ],
    rows: [],
  };

  shifts: Shift[] = [];
  currentShift: Shift | null = null;

  shiftForm!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _shiftService: ShiftService
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.shiftForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      perKm: ['', [Validators.required, Validators.minLength(4)]],
      value: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.getShifts();
  }

  getShifts(): void {
    this._shiftService.getShifts().subscribe((data) => {
      this.shifts = [...data];
      this.fillShiftsTable();
    });
  }

  fillShiftsTable(): void {
    this.shiftsTableConfig.rows = this.shifts.map((shift, index) => {
      return {
        id: shift.id!.toString(),
        rowItems: [
          {
            text: (index + 1).toString(),
          },
          {
            text: shift.name,
          },
          {
            text: shift.perKm,
          },
          {
            actions: [
              {
                icon: 'fa fa-pencil',
                callback: () => {
                  this.initializeShiftUpdate(shift.id!);
                },
              },
              {
                icon: 'fa fa-trash',
                callback: () => {
                  this.removeShift(shift.id!);
                },
              },
            ],
          },
        ],
      };
    });
  }

  initializeShiftUpdate(id: number): void {
    this.currentShift = this.shifts.find((shift) => shift.id === id)!;

    const { name, perKm, value } = this.currentShift;

    this.shiftForm.setValue({
      name,
      perKm,
      value,
    });
  }

  removeShift(id: number): void {
    this._shiftService.deleteShift(id).subscribe(() => {
      this.getShifts();
    });
  }

  pay(isOut: boolean): void {
    const shift: Shift = {
      ...this.shiftForm.value,
      isOut,
    };

    if (this.currentShift) {
      this._shiftService
        .updateShift(this.currentShift.id!, shift)
        .subscribe((_) => {
          this._doOnSuccess();
        });
    } else {
      this._shiftService.payShift(shift).subscribe((_) => {
        this._doOnSuccess();
      });
    }
  }

  get areButtonsDisabled(): boolean {
    return this.shiftForm.invalid;
  }

  get totalPayIn(): number {
    return this.shifts.filter((shift) => !shift.isOut).length;
  }

  get totalPayOut(): number {
    return this.shifts.filter((shift) => shift.isOut).length;
  }

  private _doOnSuccess(): void {
    this.shiftForm.reset('');
    this.getShifts();
  }
}
