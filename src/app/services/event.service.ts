import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsURL = 'https://genforeningen-api.azurewebsites.net/events';

  constructor(private httpClient: HttpClient) { }

  getEvent(id: string): Observable<Event> {
    // TODO: fetch image 
    console.log(this.eventsURL + `/${id}`);
    return this.httpClient.get<Event>(this.eventsURL + `/${id}`, { withCredentials: true }).pipe(catchError(this.handleError));
  }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.eventsURL, { withCredentials: true }).pipe(catchError(this.handleError));
  }

  getEventsMultiPage(page:number): Observable<Event[]> {
    let position = page * 50;
    return this.httpClient.get<Event[]>(this.eventsURL, { withCredentials: true, params: {position: position.toString()} }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorString = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorString = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      if(error.status === 401){
        errorString = 'Unauthorized';
      } else if(error.status === 500){
        errorString = 'Internal Server Error';
      }
    }
    // return an observable with a user-facing error message
    return throwError(errorString);
  }
}
