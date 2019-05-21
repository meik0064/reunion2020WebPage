import { Component, OnInit } from '@angular/core';
import { Event } from "../models/event";
import { EVENTS } from "../models/mock-events";
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }
  events : Event[];

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

}
