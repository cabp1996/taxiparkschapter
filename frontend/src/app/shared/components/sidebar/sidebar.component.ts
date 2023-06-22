import {
  Component,
  DoCheck,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SidebarItem, User } from '../../interfaces';
import { SidebarService } from '../../services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy, DoCheck {
  @Input() sidebarItems: SidebarItem[] = [];

  isCollapsed: boolean = false;

  private _onDestroy$ = new Subject();

  currentUser: User = {
    name: '',
    phone: '',
  };

  iterableDiffer: IterableDiffer<SidebarItem>;

  constructor(
    private readonly _sidebarService: SidebarService,
    private readonly _authService: AuthService,
    private readonly _iterableDiffers: IterableDiffers,
    private readonly _router: Router
  ) {
    this.iterableDiffer = _iterableDiffers.find([]).create(undefined);
  }

  ngOnInit(): void {
    this.onIsCollasedChange();
    this.onCurrentUserChange();
  }

  ngDoCheck(): void {
    const changes = this.iterableDiffer.diff(this.sidebarItems);
    if (changes) {
      const routeSegments = this._router.url.split('/');
      const route: string = routeSegments[routeSegments.length - 1];
      const activeIndex: number = this.sidebarItems.findIndex(
        ({ path }) => path === route
      );
      this.updateSiblingsOfActiveLink(activeIndex);
    }
  }

  onIsCollasedChange(): void {
    this._sidebarService.isCollapsed
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((isCollapsed) => {
        this.isCollapsed = isCollapsed;
      });
  }

  onCurrentUserChange(): void {
    this._authService.currentUser
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((user) => {
        this.currentUser = { ...user };
      });
  }

  updateSiblingsOfActiveLink(index: number) {
    this.sidebarItems.forEach((item) => {
      item.hasSiblingActiveAbove = false;
      item.hasSiblingActiveBelow = false;
    });

    if (index !== 0) {
      this.sidebarItems[index - 1].hasSiblingActiveBelow = true;
    }

    if (index !== this.sidebarItems.length - 1) {
      this.sidebarItems[index + 1].hasSiblingActiveAbove = true;
    }
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  removeListeners(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
