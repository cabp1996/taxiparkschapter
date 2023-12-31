import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {}
