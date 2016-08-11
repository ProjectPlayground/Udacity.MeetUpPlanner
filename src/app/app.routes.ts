import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { ProfileComponent } from './profile';
import { AppComponent } from './app.component';
import { EventListComponent } from './event-list';
import { EventCreateComponent } from './event-create';

const routes: RouterConfig = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:uid', component: ProfileComponent},
  { path: 'events', component: EventListComponent},
  { path: 'events/add', component: EventCreateComponent}
];

export const appRouterProviders = [
  provideRouter(routes)
];
