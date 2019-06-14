import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEventRouteComponent } from './review-event-route.component';

describe('ReviewEventRouteComponent', () => {
  let component: ReviewEventRouteComponent;
  let fixture: ComponentFixture<ReviewEventRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewEventRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEventRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
