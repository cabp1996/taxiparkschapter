import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDriverComponent } from './top-driver.component';

describe('TopDriverComponent', () => {
  let component: TopDriverComponent;
  let fixture: ComponentFixture<TopDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopDriverComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDriverComponent);
    component = fixture.componentInstance;

    component.topDriver = {
      income: 5,
      name: 'name',
      orders: 5,
      telephone: '0987654321',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
