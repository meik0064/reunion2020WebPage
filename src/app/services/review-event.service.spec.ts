import { TestBed } from '@angular/core/testing';

import { ReviewEventService } from './review-event.service';

describe('ReviewEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewEventService = TestBed.get(ReviewEventService);
    expect(service).toBeTruthy();
  });
});
