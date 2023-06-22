import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-dummie',
  template: '<div>dummie</div>',
})
export class DummieComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, DummieComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'main',
            component: DummieComponent,
          },
        ]),
        HttpClientModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
  });

  it('login navigates tu main when succees', () => {
    const loginCredentials = { phone: '1234567890', password: 'Cesar123@' };
    jest.spyOn(authService, 'login').mockReturnValue(of(null));
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.loginForm.setValue(loginCredentials);
    component.login();

    expect(navigateSpy).toHaveBeenCalledWith(['main']);
  });
});
