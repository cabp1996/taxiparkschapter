import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('../clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'rides',
        loadChildren: () =>
          import('../rides/rides.module').then((m) => m.RidesModule),
      },
      {
        path: 'shifts',
        loadChildren: () =>
          import('../shift/shift.module').then((m) => m.ShiftModule),
      },
      {
        path: 'cars',
        loadChildren: () =>
          import('../cars/cars.module').then((m) => m.CarsModule),
      },
      {
        path: 'moderators',
        loadChildren: () =>
          import('../moderators/moderators.module').then(
            (m) => m.ModeratorsModule
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
