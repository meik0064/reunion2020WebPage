import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl = 'https://genforeningen-api.azurewebsites.net/admins/login';
  private jwtHelper: JwtHelperService;

  public redirectUrl: string;

  constructor(private httpClient: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  login(username, password): Observable<any> {
    return this.httpClient.post(this.loginUrl, { "username": username, "password": password }, { withCredentials: true }).pipe(catchError(this.handleError));
  }

  isLoggedIn(): boolean {
    //console.log('In auth service, isLoggedIn() called');
    let returnVal = false;

    let token = localStorage.getItem('token');

    if (token) {
      //console.log('In token exists');
      let decodedtoken = this.jwtHelper.decodeToken(token);

      console.log(decodedtoken);

      let tokenExpired: boolean = this.jwtHelper.isTokenExpired(JSON.stringify(token));
      //console.log("tokenExpired was:" + tokenExpired);
      if (!tokenExpired) {
        returnVal = true;
      }
    }
    return returnVal;
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
