import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _router: Router,
    private readonly _sidebarService: SidebarService,
    private readonly _authService: AuthService
  ) {}

  currentUser: User = {
    name: '',
    phone: '',
  };

  private _onDestroy$ = new Subject();

  ngOnInit(): void {
    this.onCurrentUserChange();
  }

  onCurrentUserChange(): void {
    this._authService.currentUser
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((user) => {
        this.currentUser = { ...user };
      });
  }

  manageSidebar(): void {
    if (!this._sidebarService.isCollapsed.value) {
      this._sidebarService.collapseSidebar();
      return;
    }

    this._sidebarService.uncollapseSidebar();
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  removeListeners(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
