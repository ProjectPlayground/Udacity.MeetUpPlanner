import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { ProfileComponent } from './profile';
import { AppComponent } from './app.component';
import { EventListComponent } from './event-list';
import { EventCreateComponent } from './event-create';
import { EventListResolver } from './event-list';
import { ProfileDataResolver } from './profile';
import { HomeComponent } from './home'

const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }, 
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
    component: EventCreateComponent
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
