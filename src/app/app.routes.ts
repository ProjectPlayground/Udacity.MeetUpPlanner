import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './login';

const routes: RouterConfig = [
  { path: 'login', component: LoginComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
