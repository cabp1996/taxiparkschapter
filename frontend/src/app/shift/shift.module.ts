import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsReportComponent } from './views/shifts-report/shifts-report.component';
import { ShiftRoutingModule } from './shif.routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ShiftsReportComponent],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ShiftModule {}
