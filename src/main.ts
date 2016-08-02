import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment, appRouterProviders  } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,
[
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: 'AIzaSyAIu7P5w9Jg1sF33CsS0px39mhe9nGsFWU',
    authDomain: 'meetupplanner-65097.firebaseapp.com',
    databaseURL: 'https://meetupplanner-65097.firebaseio.com',
    storageBucket: 'meetupplanner-65097.appspot.com',
  }),
  appRouterProviders,
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Redirect
  })
])
.catch(err => console.error(err));
