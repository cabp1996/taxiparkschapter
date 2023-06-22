import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftsReportComponent } from './views/shifts-report/shifts-report.component';

const routes: Routes = [
  {
    path: '',
    component: ShiftsReportComponent,
  },
  {
    path: '',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ShiftRoutingModule {}
