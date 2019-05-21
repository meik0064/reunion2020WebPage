import { Injectable } from '@angular/core';
import { Event } from "../models/event";
import { EVENTS } from "../models/mock-events";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }


  getEvents(): Observable<Event[]> {
    return of(EVENTS);
  }

  getEvent(id: number): Observable<Event> {
    // TODO: send the message _after_ fetching the hero
    return of(EVENTS.find(event => event.id === id));
  }

}
