import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  public jwtHelper: JwtHelperService;
  
  constructor(private router: Router ){
    this.jwtHelper = new JwtHelperService();
  }

  canActivate(): boolean {
      console.log('In guard, canActivate() called');
      var token = localStorage.getItem('token');
      var key = localStorage.getItem('key');
      var decodedtoken = this.jwtHelper.decodeToken(token);
      console.log(decodedtoken);
      var tokenExpired:boolean = this.jwtHelper.isTokenExpired(JSON.stringify(token));
      console.log("tokenExpired was:" + tokenExpired);
      if (key=='ACCEPTED'&&!tokenExpired)
        return true; 
      else{
        this.router.navigate(['/events']);
        return false;
      }
      
  }
}

