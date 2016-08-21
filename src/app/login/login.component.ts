import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  directives: [ ROUTER_DIRECTIVES ],
  styleUrls: ['./../app.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private pass: string;

  constructor(public af: AngularFire, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.af.auth.login({ email: this.email, password: this.pass })
    .then(authState => this.router.navigate(['/profile', authState.uid]));
  }
}
