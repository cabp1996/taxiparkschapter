import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthCanActivateGuard implements CanActivate {
  constructor(private readonly _router: Router) {}

  canActivate(): boolean {
    const authToken = sessionStorage.getItem('token');
    if (!authToken) {
      this._router.navigate(['/']);
      return false;
    }

    return true;
  }
}
