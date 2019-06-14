import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReviewEvent } from '../models/review-event';

@Injectable({
  providedIn: 'root'
})
export class ReviewEventService {
  private eventsURL = 'https://genforeningen-api-website.azurewebsites.net/review-events';

  constructor(private httpClient: HttpClient) { }

  postEvent(event): Observable<Object> {

    //TODO: Upload image and update imageId   
    
    return this.httpClient.post(this.eventsURL, event, { withCredentials: true }).pipe(catchError(this.handleError));
  }

  getEventAmount(searchString, date, descending): Observable<number> {
    let params = new HttpParams();

    if(searchString){
      params = params.set('search_string', searchString);
    }
    if(date){
      params = params.set('date', date);
      if(descending){
        params = params.set('descending', descending);
      }
    }
    
    let httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get<number>(this.eventsURL + '/count', { headers: httpHeaders, params: params, withCredentials: true }).pipe(catchError(this.handleError));
  }

  getEvent(id: string): Observable<ReviewEvent> {
    // TODO: fetch image 
    console.log(this.eventsURL + `/${id}`);
    let httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get<ReviewEvent>(this.eventsURL + `/${id}`, { headers: httpHeaders, withCredentials: true }).pipe(catchError(this.handleError));
  }

  getEvents(position, searchString, date, descending): Observable<ReviewEvent[]> {
    let params = new HttpParams();
    params = params.set('position', position);

    if(searchString){
      params = params.set('search_string', searchString);
    }
    if(date){
      params = params.set('date', date);
      if(descending){
        params = params.set('descending', descending);
      }
    }
    let httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get<ReviewEvent[]>(this.eventsURL, { headers: httpHeaders, params: params, withCredentials: true }).pipe(catchError(this.handleError));
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
      if (error.status === 401) {
        errorString = 'Unauthorized';
      } else if (error.status === 500) {
        errorString = 'Internal Server Error';
      }
    }
    // return an observable with a user-facing error message
    return throwError(errorString);
  }
 
}
