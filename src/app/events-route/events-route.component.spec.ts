import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsRouteComponent } from './events-route.component';

describe('EventsRouteComponent', () => {
  let component: EventsRouteComponent;
  let fixture: ComponentFixture<EventsRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
