import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SidebarService } from '../../services';
@Component({
  selector: 'dummie',
  template: '<div>dummie</div>',
})
export class DummieComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let sidebarService: SidebarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: DummieComponent,
          },
        ]),
        HttpClientModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    sidebarService = TestBed.inject(SidebarService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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

  it('logout call router to login view', () => {
    const spyRouter = jest.spyOn(router, 'navigate');
    component.logout();
    expect(spyRouter).toHaveBeenCalledWith(['login']);
  });

  it('manageSidebar collapses sidebar if it is not collapsed', () => {
    const spy = jest.spyOn(sidebarService, 'collapseSidebar');
    sidebarService.isCollapsed.next(false);

    component.manageSidebar();

    expect(spy).toHaveBeenCalled();
  });

  it('manageSidebar uncollapses sidebar if it is collapsed', () => {
    const spy = jest.spyOn(sidebarService, 'uncollapseSidebar');
    sidebarService.isCollapsed.next(true);

    component.manageSidebar();

    expect(spy).toHaveBeenCalled();
  });
});
