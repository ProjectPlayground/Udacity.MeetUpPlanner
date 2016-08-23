import { Component, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  directives: [ROUTER_DIRECTIVES],
  styleUrls: ['./../app.component.css']
})
export class LoginComponent implements AfterViewInit {

  private email: string;
  private pass: string;
  private errMsg = null;

  constructor(public af: AngularFire, private router: Router) { }

  ngAfterViewInit() {
    document.getElementById('email').focus();
  }

  login() {
    this.errMsg = null;
    this.af.auth.login({ email: this.email, password: this.pass })
      .then(authState => this.router.navigate(['/profile', authState.uid]))
      .catch(err => this.errMsg = err.toString());
  }
}
