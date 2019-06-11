import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Event } from "../models/event";
import { EventService } from "../services/event.service";

@Component({
  selector: 'app-event-route',
  templateUrl: './event-route.component.html',
  styleUrls: ['./event-route.component.css']
})
export class EventRouteComponent implements OnInit {
  private isLoading: boolean;
  private errorMessage: string;
  private event: Event;
  private imgURL: string

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private location: Location) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.imgURL = 'https://i.ytimg.com/vi/9tzJO7ATcjM/maxresdefault.jpg';
    this.eventService.getEvent(this.route.snapshot.paramMap.get('id')).subscribe(event => {
      this.errorMessage = null;
      this.event = event;
      this.isLoading = false;
    }, err => {
      this.event = null;
      this.isLoading = false;
      this.errorMessage = err;      
    });
  }

  goBack(): void {
    this.location.back();
  }  
}
