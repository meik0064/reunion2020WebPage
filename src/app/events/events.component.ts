import { Component, OnInit, Output, HostListener } from '@angular/core';
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
  private canActivateButtonPrevious: boolean;
  private canActivateButtonNext: boolean;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => this.events = events);
    this.page = 0;
    this.canActivateButtonPrevious = false;
    this.canActivateButtonNext = true;
  }


  onPreviousClicked() {
    this.canActivateButtonPrevious = false;
    this.page -= 1;
    this.getEventsMultiPage(this.page)
    if (this.page >= 1) {
      this.canActivateButtonPrevious = true;
      this.canActivateButtonNext = true;
    }
    console.log(this.page + "   " + this.events.length + "       previousclicked")
  }
  onNextClicked() {
    this.canActivateButtonNext = false;
    this.page += 1;
    this.getEventsMultiPage(this.page)
    console.log(this.events.length + "       nextclicked")
    if (this.events.length >= 3) {
      this.canActivateButtonNext = true;
      this.canActivateButtonPrevious = true;
    }
    console.log(this.page + "   " + this.events.length + "       nextclicked")
  }

  getEventsMultiPage(page: number) {
    this.eventService.getEventsMultiPage(this.events.length * page).subscribe(events => this.events = events);
  }

}
