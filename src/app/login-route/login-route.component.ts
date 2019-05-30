import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.css']
})
export class LoginRouteComponent implements OnInit {

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
    if (isLoggedIn) {
      this.router.navigateByUrl('/events');
    }
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginFormParent.get('usernameForm').value, this.loginFormParent.get('passwordForm').value);
    this.authService.login(this.loginFormParent.get('usernameForm').value, this.loginFormParent.get('passwordForm').value).subscribe((res) => {
      localStorage.setItem('token', res.token);
      if (this.authService.isLoggedIn()) {
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/events';
        this.router.navigateByUrl(redirect);
      }
    }, (err) => {
      this.loginFailed = true;
      this.errorMessage = err;
    });
  }
}
