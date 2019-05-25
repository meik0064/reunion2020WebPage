import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }      from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginFailed: boolean;
  private errorMessage: string;

  private usernameVar: string;
  private passwordVar: string;


  loginFormParent = new FormGroup({
    usernameForm: new FormControl(this.usernameVar, [Validators.required, Validators.minLength(4)]),
    passwordForm: new FormControl(this.passwordVar, [Validators.required, Validators.minLength(4)]),
  });

  get username() { return this.loginFormParent.get('usernameForm'); }
  get password() { return this.loginFormParent.get('passwordForm'); }

  public jwtHelper: JwtHelperService;

  constructor(private authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.loginFailed = false;
    this.jwtHelper = new JwtHelperService();
    let isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn){
      this.router.navigateByUrl('/events');
    } 
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginFormParent.get('usernameForm').value, this.loginFormParent.get('passwordForm').value);
    this.authService.login(this.loginFormParent.get('usernameForm').value, this.loginFormParent.get('passwordForm').value).subscribe((res) => {
      localStorage.setItem('token', res.token);
      if(this.authService.isLoggedIn()) {
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/events';        
        this.router.navigateByUrl(redirect);
      }
    }, (err) => {
      this.loginFailed = true;
      this.errorMessage = err;
    });
  }
}



