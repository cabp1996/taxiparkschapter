import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RidesComponent } from './views/rides/rides.component';

const routes: Routes = [
  {
    path: '',
    component: RidesComponent,
  },
  {
    path: '',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class RidesRoutingModule {}
