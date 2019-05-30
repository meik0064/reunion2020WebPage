import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRouteComponent } from './event-route.component';

describe('EventRouteComponent', () => {
  let component: EventRouteComponent;
  let fixture: ComponentFixture<EventRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
