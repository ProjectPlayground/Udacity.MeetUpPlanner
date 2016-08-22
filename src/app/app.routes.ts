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
import { NotFoundComponent } from './notfound';
import { NotLoggedInComponent } from './notloggedin';
import { LoggedInGuard } from './shared/';

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
    canActivate: [LoggedInGuard]
  },
  {
    path: 'events',
    component: EventListComponent,
    resolve: {
      events: EventListResolver
    },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'event',
    component: EventCreateComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'newevent',
    component: EventCreateComponent,
    data: { newEvent: true },
    canActivate: [LoggedInGuard]
  },
  {
    path: 'notloggedin',
    component: NotLoggedInComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

export const appRouterProviders = [
  provideRouter(routes)
];
