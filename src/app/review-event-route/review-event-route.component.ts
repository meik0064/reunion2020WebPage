import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewEventService } from '../services/review-event.service';
import { ReviewEvent } from '../models/review-event';

@Component({
  selector: 'app-review-event-route',
  templateUrl: './review-event-route.component.html',
  styleUrls: ['./review-event-route.component.css']
})
export class ReviewEventRouteComponent implements OnInit {
  private isLoading: boolean;
  private errorMessage: string;
  private event: ReviewEvent;
  private imgURL: string

  constructor(private route: ActivatedRoute,
              private reviewEventService: ReviewEventService) {

  }

  ngOnInit() {
    this.isLoading = true;
    //this.imgURL = 'https://i.ytimg.com/vi/9tzJO7ATcjM/maxresdefault.jpg';
    this.reviewEventService.getEvent(this.route.snapshot.paramMap.get('id')).subscribe(event => {
      this.errorMessage = null;
      this.event = event;
      this.isLoading = false;
    }, err => {
      this.event = null;
      this.isLoading = false;
      this.errorMessage = err;      
    });
  }
}
