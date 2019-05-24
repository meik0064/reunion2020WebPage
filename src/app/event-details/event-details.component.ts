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
  private event: Event;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private location: Location) {

  }

  ngOnInit() {
    console.log('in event-details oninit');
    //this.eventService.getEvent(this.route.snapshot.paramMap.get('id')).subscribe(event => this.event = event);
    //this.getEvent();

    this.event = {
      _id: "1",
      title: "Dette er event titlen",
      date: "1586383200000",
      description: "This is a hoax description only used to take This is a hoax description only used to take This is a hoax description only used to take This is a hoax description only used to take This is a hoax description only used to take This is a hoax description only used to take ",
      location: "Alsgade 4, 6400 Sønderborg",
      targetGroupMin: 5,
      targetGroupMax: 45,
      imageId: "imageid here",
      status: "active",
      __v: "version here"
  
    }
  }

  /*getEvent(): void {    
  }*/


  goBack(): void {
    this.location.back();
  }
}
