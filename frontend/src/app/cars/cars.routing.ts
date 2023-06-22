import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarClassesComponent } from './views/car-classes/car-classes.component';

const routes: Routes = [
  {
    path: '',
    component: CarClassesComponent,
  },
  {
    path: '',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CarsRoutingModule {}
