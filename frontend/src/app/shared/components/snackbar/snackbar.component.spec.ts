import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { SnackbarService } from '../../services/snackbar.service';

import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let mockSnackbarService: SnackbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockSnackbarService = TestBed.inject(SnackbarService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onActionClick call an action', () => {
    component.action = () => {
      const x = 1;
    };
    const spy = jest.spyOn(component, 'action');

    component.onActionClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should showSnackbar not add any class to snackbar dom container if its undefined', () => {
    component.snackbar = undefined;
    component.showSnackbar();
    const snackbarContainer: HTMLDivElement = component.snackbar?.nativeElement;
    expect(snackbarContainer).toBeFalsy();
  });

  it('should showSnackbar add a show class to snackbar dom container', () => {
    component.showSnackbar();
    const snackbarContainer: HTMLDivElement = component.snackbar.nativeElement;
    expect(snackbarContainer.classList).toContain('show');
  });

  it('should showSnackbar add a show class to snackbar dom container', fakeAsync(() => {
    component.showSnackbar();
    tick(component.duration);
    const snackbarContainer: HTMLDivElement = component.snackbar.nativeElement;
    expect(snackbarContainer.classList).not.toContain('show');
  }));

  it('should onSnackbarMessage show snackbar when receives a snack bar show message', () => {
    const spy = jest.spyOn(component, 'showSnackbar');
    mockSnackbarService.showSnackbar({
      message: 'Message',
      type: 'error',
    });
    expect(spy).toHaveBeenCalled();
  });
});
