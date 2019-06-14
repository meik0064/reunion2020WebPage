import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { EventsRouteComponent } from './events-route/events-route.component';
import { EventRouteComponent } from './event-route/event-route.component';
import { CreateEventRouteComponent } from './create-event-route/create-event-route.component';
import { LoginRouteComponent } from './login-route/login-route.component';
import { ReviewEventsRouteComponent } from './review-events-route/review-events-route.component';
import { ReviewEventRouteComponent } from './review-event-route/review-event-route.component';

const routes: Routes = [
  { path: 'events', component: EventsRouteComponent },
  { path: 'events/:id', component: EventRouteComponent },
  { path: 'login', component: LoginRouteComponent },
  { path: 'create-event', component: CreateEventRouteComponent },
  { path: 'review-events', component: ReviewEventsRouteComponent, canActivate: [AuthGuard] },
  { path: 'review-events/:id', component: ReviewEventRouteComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: '**', redirectTo: '/events', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
