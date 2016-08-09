import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { ProfileComponent } from './profile';
import { AppComponent } from './app.component';

const routes: RouterConfig = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:uid', component: ProfileComponent}
];

export const appRouterProviders = [
  provideRouter(routes)
];
