import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { EventsRouteComponent } from './events-route/events-route.component';
import { EventRouteComponent } from './event-route/event-route.component';
import { CreateEventRouteComponent } from './create-event-route/create-event-route.component';
import { LoginRouteComponent } from './login-route/login-route.component';

const routes: Routes = [
  { path: 'events', component: EventsRouteComponent },
  { path: 'events/:id', component: EventRouteComponent },
  { path: 'login', component: LoginRouteComponent },
  { path: 'createEvent', component: CreateEventRouteComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: '**', redirectTo: '/events', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
