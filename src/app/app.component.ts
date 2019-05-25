import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private isSideNavOpen: boolean;
  title = 'GenforeningenPrototype';
  public innerWidth: any;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.isSideNavOpen = false;
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  isLoggedIn() {
    let loggedIn = this.authService.isLoggedIn();
    if(!loggedIn){
      this.isSideNavOpen = false;
    }
    return loggedIn;
  }

  logOut(){
    localStorage.removeItem('token');
  }
}
