import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { ProfileComponent } from './profile';
import { AppComponent } from './app.component';
import { EventListComponent } from './event-list';
import { EventCreateComponent, EventCreateRoutes } from './event-create';
import {EventListResolver} from './event-list';
import { ProfileDataResolver } from './profile';

const routes: RouterConfig = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile/:uid',
    resolve: {
      events: EventListResolver,
      user: ProfileDataResolver,
    },
    component: ProfileComponent,

  },
  { path: 'events', component: EventListComponent },
  {
    path: 'event',
    component: EventCreateComponent,
    children:
    [
      ...EventCreateRoutes
    ]
  },
  {
    path: 'newevent',
    component: EventCreateComponent,
    data: { newEvent: true }
  }

];

export const appRouterProviders = [
  provideRouter(routes)
];
