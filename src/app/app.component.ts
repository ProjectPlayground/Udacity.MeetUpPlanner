import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit {

  private loggedIn: boolean;
  private user = null;

  constructor(public af: AngularFire, public router: Router) {

  }

  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if (authState != null) {
        this.loggedIn = true;
        this.user = authState.auth;
      }
    });
  }

  LogOut() {
    this.af.auth.logout();
    this.loggedIn = false;
    this.router.navigate(['login']);
  }
}
