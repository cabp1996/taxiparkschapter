import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TopDriverComponent } from '../../components/top-driver/top-driver.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { KnowledgeCardComponent } from '../../components/knowledge-card/knowledge-card.component';
import { SharedModule } from '../../../shared/shared.module';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RideService } from '../../../rides/services/ride.service';
import { of } from 'rxjs';
import { Ride } from 'src/app/shared/interfaces';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let rideService: RideService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
      declarations: [
        DashboardComponent,
        TopDriverComponent,
        DashboardCardComponent,
        KnowledgeCardComponent,
        SidebarComponent,
        HeaderComponent,
      ],
      providers: [DatePipe, CurrencyPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    rideService = TestBed.inject(RideService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('getRides fill table config of rides', () => {
    jest.spyOn(rideService, 'getRides').mockReturnValue(
      of([
        {
          id: '1',
          userName: 'xxxxx',
          userPhone: 'xxxxx',
          carComfort: 'xxxxx',
          orderedTime: 'xxxxx',
          startLocation: 'xxxxx',
          finishLocation: 'xxxxx',
          income: '1',
          reason: 'xxxxx',
          status: 'Pending',
        },
      ])
    );

    component.getRides();

    expect(component.driversTableConfig.rows.length).toBeGreaterThan(0);
  });
});
