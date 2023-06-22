import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './views/clients/clients.component';
import { ClientsRoutingModule } from './clients.routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterClientsPipe } from './pipes/filter-clients.pipe';

@NgModule({
  declarations: [ClientsComponent, FilterClientsPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientsRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [FilterClientsPipe],
})
export class ClientsModule {}
