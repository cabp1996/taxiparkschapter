import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import { TimelineService } from '../../../shared/services';
import { Ride } from '../../../shared/interfaces';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;
  let timelineService: TimelineService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    timelineService = TestBed.inject(TimelineService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnDestroy removes listeners', () => {
    const spy = jest.spyOn(component, 'removeListeners');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('onRideChange fill timeline ride and show it', () => {
    const mockRide: Ride = {
      carComfort: 'str',
      finishLocation: 'str',
      id: '1',
      income: '1er',
      orderedTime: 'ord',
      reason: 'reason',
      startLocation: 'location',
      status: 'Completed',
      userName: 'user',
      userPhone: 'phone',
    };

    timelineService.setRide(mockRide);

    expect(component.timelineRide.id).toBe(mockRide.id);
    expect(component.showTimeline).toBeTruthy();
  });
});
