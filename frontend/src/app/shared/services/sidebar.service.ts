import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isCollapsed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  collapseSidebar(): void {
    this.isCollapsed.next(true);
  }

  uncollapseSidebar(): void {
    this.isCollapsed.next(false);
  }
}
