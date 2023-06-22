import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

xdescribe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientModule],
      declarations: [MainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('menu should be like the mock', () => {
    const mockMenu = [
      {
        label: 'Dashboard',
        icon: 'fa-windows',
        path: 'dashboard',
      },
      {
        label: 'Rides',
        icon: 'fa-clock-o',
        path: 'rides',
      },
      {
        label: 'Clients',
        icon: 'fa-users',
        path: 'clients',
      },
      {
        label: 'Shift',
        icon: 'fa-usd',
        path: 'shifts',
      },
      {
        label: 'Cars Classes',
        icon: 'fa-car',
        path: 'cars',
      },
      {
        label: 'Moderators',
        icon: 'fa-users',
        path: 'moderators',
      },
    ];

    expect(component.menu).toEqual(mockMenu);
  });
});
