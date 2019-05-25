import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Event } from "../models/event";
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  private events: Event[];
  private page: number;
  private canActivateButton: boolean;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => this.events = events);
    this.page = 1;
    this.canActivateButton = true;
  }


  onNextClicked(pageNumber:number){
    this.canActivateButton = false;
    this.eventService.getEventsMultiPage(pageNumber).subscribe(events => this.events = events);
    this.canActivateButton = true;
  }

}
