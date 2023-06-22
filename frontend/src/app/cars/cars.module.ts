import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarClassesComponent } from './views/car-classes/car-classes.component';
import { CarsRoutingModule } from './cars.routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CarClassesComponent],
  imports: [
    CommonModule,
    CarsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class CarsModule {}
