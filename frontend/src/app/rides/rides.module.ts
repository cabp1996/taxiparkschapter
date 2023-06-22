import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RidesComponent } from './views/rides/rides.component';
import { RidesRoutingModule } from './rides.routing';
import { FilterComponent } from './components/filter/filter.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RidesComponent, FilterComponent],
  imports: [CommonModule, RidesRoutingModule, SharedModule, HttpClientModule],
  providers: [DatePipe, CurrencyPipe],
})
export class RidesModule {}
