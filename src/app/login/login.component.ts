import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  directives: [ ROUTER_DIRECTIVES ],
  styleUrls: ['login.component.css', './../app.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private pass: string;

  constructor(public af: AngularFire) { }

  ngOnInit() {
  }

  login() {
    this.af.auth.login({ email: this.email, password: this.pass });
  }
}
