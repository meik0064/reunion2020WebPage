import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [
  {path: 'events', component: EventsComponent},
  {path: 'events/:id', component: EventDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'createEvent', component: CreateEventComponent},
  {path: '', redirectTo: '/events', pathMatch: 'full' },
  {path: '**', redirectTo: '/events', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
