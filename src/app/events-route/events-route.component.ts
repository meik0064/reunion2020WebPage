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
  private pageAmount: number;
  private searchString: string;
  private searchDate: Date;
  private descending: boolean;
  private position: number;
  private maxEventsLength: number;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.position = 0;
    this.page = 1;
    this.fetchEventAmount();
  }

  fetchEventAmount() {
    this.position = 0;
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
    // force events.component ngOnInit by setting this.events = null
    this.events = null;

    this.isLoading = true;
    this.eventService.getEvents(this.position, this.searchString, this.searchDate, this.descending).subscribe(events => {
      this.errorMessage = null;

      if (this.position === 0) {
        this.maxEventsLength = events.length;
        this.pageAmount = Math.ceil(this.eventAmount / this.maxEventsLength);
      }
      this.page = Math.ceil((this.position + this.maxEventsLength) / this.maxEventsLength);

      // setting the pages array - for the pages link - not tested with more than 5 pages available  
      this.pages = new Array();
      if(this.pageAmount > 5) {
        if(this.page <= 2){
          this.pages.push(1);
          this.pages.push(2);
          this.pages.push(3);
          this.pages.push(4);
          this.pages.push(5);
        } else if(this.page >= (this.pageAmount - 2)){
          this.pages.push(this.pageAmount - 4);
          this.pages.push(this.pageAmount - 3);
          this.pages.push(this.pageAmount - 2);
          this.pages.push(this.pageAmount - 1);
          this.pages.push(this.pageAmount);
        } else {
          for(let i = this.page - 2; i < this.page + 2; i++){
            this.pages.push(i);
          }
        }
      } else {
        for(let i = 1; i <= this.pageAmount; i++){
          this.pages.push(i);
        }
      }

      this.events = events;
      this.isLoading = false;

    },
      err => {
        this.events = null;
        this.isLoading = false;
        this.errorMessage = err
      });
  }

  search(options) {
    this.searchString = options.search;
    this.searchDate = options.date ? options.date.toString() : null;
    this.descending = options.descending;
    this.fetchEventAmount();
  }

  pageNextPrevClick(event) {
    if (event) {
      this.position += this.maxEventsLength;
      this.fetchEventList();
    } else {
      this.position -= this.maxEventsLength;
      this.fetchEventList();
    }
  }

}
