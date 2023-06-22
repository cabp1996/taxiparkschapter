import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { SharedModule } from '../shared/shared.module';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { KnowledgeCardComponent } from './components/knowledge-card/knowledge-card.component';
import { TopDriverComponent } from './components/top-driver/top-driver.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardCardComponent,
    KnowledgeCardComponent,
    TopDriverComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  providers: [DatePipe, CurrencyPipe],
})
export class DashboardModule {}
