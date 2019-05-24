import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Event } from "../models/event";
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  @Output() event : EventEmitter<Event>;
  
  private events : Event[];
  private selectedEvent : Event;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.event = new EventEmitter<Event>();
    this.getEvents();    
  }
  
  onGoToEvent(event){
    
  }


  getEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

}
