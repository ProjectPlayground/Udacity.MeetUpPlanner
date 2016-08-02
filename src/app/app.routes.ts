import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
 
const routes: RouterConfig = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent}
];

export const appRouterProviders = [
  provideRouter(routes)
];
