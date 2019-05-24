import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameVar: string
  passwordVar: string


  loginFormParent = new FormGroup({
    usernameForm: new FormControl(this.usernameVar, [Validators.required, Validators.minLength(4)]),
    passwordForm: new FormControl(this.passwordVar, [Validators.required, Validators.minLength(4)]),
  });

  get username() { return this.loginFormParent.get('usernameForm'); }
  get password() { return this.loginFormParent.get('passwordForm'); }

  public jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
  }



  ngOnInit() {
    this.jwtHelper = new JwtHelperService();

  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginFormParent.get("usernameForm").value, this.loginFormParent.get("passwordForm").value);
    this.http.post('https://genforeningen-api.azurewebsites.net/admins/login', { "username": this.loginFormParent.get("usernameForm").value, "password": this.loginFormParent.get("passwordForm").value }, { withCredentials: true })
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

      });
  }


  logonAlt() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginFormParent.get("usernameForm").value, this.loginFormParent.get("passwordForm").value)
    this.http.post('https://genforeningen-api.azurewebsites.net/admins/login', { "username": "test", "password": "password" }, { withCredentials: true })
      .subscribe((res) => {
        var token = res;
        var isTokenExpired: boolean = this.jwtHelper.isTokenExpired(JSON.stringify(token));
        console.log("isTokenExpired:" + isTokenExpired);
        if (res.toString().length < 20) {

          localStorage.setItem('key', 'ACCEPTED');
          localStorage.setItem('token', JSON.stringify(res));
        }


      });
  }


  logon() {

    this.http.post('https://genforeningen-api.azurewebsites.net/admins/login', { "username": "test", "password": "password" }, { withCredentials: true, observe: 'response' });
  }

  /*.subscribe(response => {
    console.log("Reached0", response);
    var responseStatus = response.status;
    console.log("Reached1", responseStatus);
    console.log("Reached2", response.statusText);
    //var isTokenExpired: boolean = this.jwtHelper.isTokenExpired(JSON.stringify(token));
    //console.log("isTokenExpired:" + isTokenExpired);
    if (responseStatus == 200) {
      var token = response.body;
      console.log(token);
      console.log(this.jwtHelper.decodeToken(JSON.stringify(token)));
      localStorage.setItem('key', 'ACCEPTED');
      localStorage.setItem('token', JSON.stringify(token));
    } else if (responseStatus == 403) {
      console.log("Reached3", response.statusText);
    } else if (responseStatus == 404) {
      console.log("Reached4", response.statusText);
    }


  });*/

}



