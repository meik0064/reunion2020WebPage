import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEventsRouteComponent } from './review-events-route.component';

describe('ReviewEventsRouteComponent', () => {
  let component: ReviewEventsRouteComponent;
  let fixture: ComponentFixture<ReviewEventsRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewEventsRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEventsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
