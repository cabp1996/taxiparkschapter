import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() public id: string = '';
  @Input() public disabled: boolean = false;
  @Input() public label: string = '';

  constructor(private control: NgControl) {}

  get formControl(): FormControl {
    return this.control.control as FormControl;
  }
}
