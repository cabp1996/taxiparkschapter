import { Component } from '@angular/core';
import { SidebarItem } from '../../../shared/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  menu: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: 'fa-windows',
      path: 'dashboard',
    },
    {
      label: 'Rides',
      icon: 'fa-clock-o',
      path: 'rides',
    },
    {
      label: 'Clients',
      icon: 'fa-users',
      path: 'clients',
    },
    {
      label: 'Shift',
      icon: 'fa-usd',
      path: 'shifts',
    },
    {
      label: 'Cars Classes',
      icon: 'fa-car',
      path: 'cars',
    },
    {
      label: 'Moderators',
      icon: 'fa-users',
      path: 'moderators',
    },
  ];
}
