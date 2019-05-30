import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventRouteComponent } from './create-event-route.component';

describe('CreateEventRouteComponent', () => {
  let component: CreateEventRouteComponent;
  let fixture: ComponentFixture<CreateEventRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
