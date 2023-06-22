import { Component, Input } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { ValidatorsErrors } from '../../utils/consts/form-validators.const';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() idElement: string = '';
  @Input() placeholder: string = '';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() type: string = 'text';

  constructor(private readonly _control: NgControl) {}

  get formControl(): FormControl {
    return this._control.control as FormControl;
  }

  get errors(): string {
    const errors = this.formControl.errors;

    if (!errors) return '';

    return Object.keys(errors).reduce((message: string, errorKey) => {
      return message + ` ${ValidatorsErrors[errorKey] || ''}`;
    }, '');
  }

  get isTouched(): boolean {
    return this.formControl.touched;
  }
}
