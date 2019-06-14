import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { EventsRouteComponent } from './events-route/events-route.component';
import { EventRouteComponent } from './event-route/event-route.component';
import { CreateEventRouteComponent } from './create-event-route/create-event-route.component';
import { LoginRouteComponent } from './login-route/login-route.component';
import { ReviewEventsRouteComponent } from './review-events-route/review-events-route.component';
import { ReviewEventRouteComponent } from './review-event-route/review-event-route.component';

@NgModule({
  declarations: [
    AppComponent,   
    EventComponent,
    EventsComponent,
    EventsRouteComponent,
    EventRouteComponent,
    CreateEventRouteComponent,
    LoginRouteComponent,
    ReviewEventsRouteComponent,
    ReviewEventRouteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
