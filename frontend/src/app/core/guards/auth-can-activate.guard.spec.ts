import { TestBed } from '@angular/core/testing';

import { AuthCanActivateGuard } from './auth-can-activate.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'dummie',
  template: '<div>dummie</div>',
})
export class DummieComponent {}

describe('AuthCanActivateGuard', () => {
  let guard: AuthCanActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: DummieComponent,
          },
        ]),
      ],
      providers: [AuthCanActivateGuard],
      declarations: [DummieComponent],
    });
    guard = TestBed.inject(AuthCanActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate returnS true if authToken is present', () => {
    sessionStorage.setItem('token', 'TOKEN');
    const result = guard.canActivate();
    expect(result).toBeTruthy();
  });

  it('canActivate returnS false and navigate to home page if authToken is not present', () => {
    jest.spyOn(guard['_router'], 'navigate');
    const result = guard.canActivate();
    expect(result).toBeFalsy();
    expect(guard['_router'].navigate).toHaveBeenCalledWith(['/']);
  });

  afterEach(() => {
    sessionStorage.removeItem('token');
  });
});
