import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'not-logged-in',
  templateUrl: 'not-logged-in.component.html',
  styleUrls: ['./../app.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})

export class NotLoggedInComponent { }