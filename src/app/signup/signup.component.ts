import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { AngularFire } from 'angularfire2';


@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  directives:
  [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    ACCORDION_DIRECTIVES,
  ],
  styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public af: AngularFire) { }

  ngOnInit() {
  }

}
