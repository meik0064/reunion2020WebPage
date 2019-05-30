import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from "../models/event";

@Component({
  selector: 'app-events-route',
  templateUrl: './events-route.component.html',
  styleUrls: ['./events-route.component.css']
})
export class EventsRouteComponent implements OnInit {
  private isLoading: boolean;
  private errorMessage: string;
  private events: Event[];
  private eventAmount: number;
  private page: number;
  private pages: Array<number>;
  private searchString: string;
  private searchDate: Date;
  private descending: boolean;
  private position: number;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.position = 0;
    this.page = 1;
    this.fetchEventAmount();
  }

  fetchEventAmount() {
    this.isLoading = true;
    this.eventService.getEventAmount(this.searchString, this.searchDate, this.descending).subscribe(amount => {
      this.errorMessage = null;
      this.eventAmount = amount;
      this.fetchEventList();
    },
      err => {
        this.events = null;
        this.isLoading = false;
        this.errorMessage = err
      });
  }

  fetchEventList() {
    this.isLoading = true;
    this.eventService.getEvents(this.position, this.searchString, this.searchDate, this.descending).subscribe(events => {
      this.errorMessage = null;
      this.events = events;
      this.pages = new Array<number>();

      // a bit inefficient
      for (let i = 0; i < this.eventAmount; i += this.events.length) {
        this.pages.push(i);
      }

      this.isLoading = false;
    },
      err => {
        this.events = null;
        this.isLoading = false;
        this.errorMessage = err
      });
  }

  search(options) {
    console.log('in search');
    console.log(options);
    this.searchString = options.search;
    this.searchDate = options.date ? options.date.toString() : null;
    this.descending = options.descending;
    this.fetchEventAmount();
  }
}
