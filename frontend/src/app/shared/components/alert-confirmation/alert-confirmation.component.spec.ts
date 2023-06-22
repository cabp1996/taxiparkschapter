import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfirmationComponent } from './alert-confirmation.component';
import { ModalComponent } from '../modal/modal.component';

describe('AlertConfirmationComponent', () => {
  let component: AlertConfirmationComponent;
  let fixture: ComponentFixture<AlertConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertConfirmationComponent, ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeAlertModal closes modal', () => {
    component.closeAlertModal();
    expect(component.isOpen).toBeFalsy();
  });

  it('confirmOperation opens the modal to start prompt', () => {
    component.confirmOperation();
    expect(component.isOpen).toBeTruthy();
  });
});
