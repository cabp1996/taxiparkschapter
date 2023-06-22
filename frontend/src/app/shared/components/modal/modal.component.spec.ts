import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close emits onClose event emitter', () => {
    const spy = jest.spyOn(component.onCancel, 'emit');
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  it('stopPropagation calls event to stop propagation when modal body is clicked', () => {
    const event = { preventDefault: () => {}, stopPropagation: () => {} };
    const spy = jest.spyOn(event, 'stopPropagation');
    component.stopPropagation(event);

    expect(spy).toHaveBeenCalled();
  });
});
