import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Login } from '../../../shared/interfaces';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { finalize } from 'rxjs/operators';
import { InitService } from '../../services/init.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _snackbarService: SnackbarService,
    private readonly _initService: InitService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this._initService.initData().subscribe();
  }

  initializeForm() {
    this.loginForm = this._fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          this.validateEcuadorianPhoneNumber,
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.validatePassword],
      ],
    });
  }

  validateEcuadorianPhoneNumber(
    control: AbstractControl
  ): ValidationErrors | null {
    const value: string = control.value;
    const isValid: boolean = value.startsWith('09') || value.startsWith('+593');
    return !isValid ? { invalidPhone: true } : null;
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    const hasUppercase: boolean = Boolean(value.match(/[A-Zs]/));
    const hasNumber: boolean = Boolean(value.match(/[0-9]/));
    const hasSpecialCharacter: boolean =
      /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
    const isValid: boolean = hasUppercase && hasNumber && hasSpecialCharacter;
    return !isValid ? { invalidPassword: true } : null;
  }

  login() {
    const { phone, password } = this.loginForm.value;

    const loginCredentials: Login = {
      phone,
      password,
    };

    this.isLoading = true;

    this._authService
      .login(loginCredentials)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (_) => {
          this._router.navigate(['main']);
        },
        (_) => {
          this._snackbarService.showSnackbar({
            message: 'Error de credenciales',
            type: 'error',
          });
        }
      );
  }

  get isSubmitButtonDisabled(): boolean {
    return this.loginForm.invalid;
  }
}
