import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorCardComponent } from './moderator-card.component';
import { Moderator } from '../../../shared/interfaces';

describe('ModeratorCardComponent', () => {
  let component: ModeratorCardComponent;
  let fixture: ComponentFixture<ModeratorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeratorCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorCardComponent);
    component = fixture.componentInstance;

    const mockModerator: Moderator = {
      name: 'name',
      id: 1,
      fileUrl:''
    };

    component.moderator = mockModerator;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
