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
  private event: Event;
  private imgURL: string

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private location: Location) {

  }

  ngOnInit() {
    this.imgURL = 'https://i.ytimg.com/vi/9tzJO7ATcjM/maxresdefault.jpg';
    this.eventService.getEvent(this.route.snapshot.paramMap.get('id')).subscribe(event => this.event = event);
  }

  goBack(): void {
    this.location.back();
  }  
}
