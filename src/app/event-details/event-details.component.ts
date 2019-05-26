import { Component, OnInit, HostListener } from '@angular/core';
import { Event } from "../models/event";
import { EventService } from "../services/event.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
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
