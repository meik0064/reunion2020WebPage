import { Injectable } from '@angular/core';
import { Event } from "../models/event";
//import { EVENTS } from "../models/mock-events";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private eventsURL = 'https://genforeningen-api.azurewebsites.net/events';


  /*getEvents(): Observable<Event[]> {
    return of(EVENTS);
  }
*/

  getEvent(id: string): Observable<Event> {
    // fetch image
    // TODO: send the message _after_ fetching the hero
    const url = `${this.eventsURL}/${id}`;
    return this.http.get<Event>(url).pipe(
      tap(_ => console.log(`fetched event id=${id}`)),
      catchError(this.handleError<Event>(`getHero id=${id}`))
    );
  }



  getEvents(): Observable<Event[]> {
    var smthing = this.http.get<Event[]>(this.eventsURL).pipe(catchError(this.handleError<Event[]>('getEvents, []')));
    console.log(smthing)
    return smthing;

  }













    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }


 /* getEvents(): Observable<Event[]> {

    return of(    this.http.post('https://genforeningen-api.azurewebsites.net/admins/login', { "username": this.loginFormParent.get("usernameForm").value, "password": this.loginFormParent.get("passwordForm").value }, { withCredentials: true })
    .subscribe((res) => {        
      var token = res;
      var isTokenExpired: boolean = this.jwtHelper.isTokenExpired(JSON.stringify(token));
      console.log("isTokenExpired:" + isTokenExpired);
      if (res.toString().length < 20) {

        localStorage.setItem('key', 'ACCEPTED');
        localStorage.setItem('token', JSON.stringify(res));
      }
    }, (err) => {
      console.debug('In error func\n' + err);

    });)
  }



*/



}
