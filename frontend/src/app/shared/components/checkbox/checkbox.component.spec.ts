import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import {
  AbstractControl,
  FormControl,
  NgControl,
  Validators,
} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class MockedNgControl extends NgControl {
  viewToModelUpdate(_newValue: any): void {
    throw new Error('Method not implemented.');
  }

  get control(): AbstractControl {
    const control = new FormControl();
    control.setValidators([Validators.required]);
    control.setErrors({ invalid: true });
    control.markAsTouched();
    control.markAsDirty();
    return control;
  }
}

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let ngControl: NgControl;

  beforeEach(async () => {
    ngControl = new MockedNgControl();

    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      providers: [{ provide: NgControl, useValue: ngControl }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
