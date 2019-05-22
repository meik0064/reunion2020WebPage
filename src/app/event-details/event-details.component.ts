import { Component, OnInit, Input } from '@angular/core';
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
  @Input() event: Event;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location,) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(id)
      .subscribe(event => this.event = event);
      console.log(id);
  }




  goBack(): void {
    this.location.back();
  }
}
