import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { FORM_EXTENSION_DIRECTIVES, CustomValidatorsService } from './../shared/form-extensions';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'app-event-create',
  templateUrl: 'event-create.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_EXTENSION_DIRECTIVES, ROUTER_DIRECTIVES],
  styleUrls: ['./../app.component.css', 'event-create.component.css'],
  providers: [CustomValidatorsService]
})
export class EventCreateComponent implements OnInit {

  private formData: FormGroup;
  private eventId: Number;

  constructor(
    private af: AngularFire,
    private validators: CustomValidatorsService) { }

  ngOnInit() {
    this.getNextEventId();
    this.af.auth.subscribe(authState => this.getUser(authState));
  }


  getUser(authState) {
    if (authState != null && authState.auth != null) {
      this.af.database.object(`/users/${authState.auth.uid}`)
        .subscribe(u => {
          (<FormControl>this.formData.controls['host']).updateValue(u.displayName);
        });

      (<FormControl>this.formData.controls['created_by']).updateValue(authState.auth.uid);
    } else {
      console.log('send 403');
    }
  }

  getNextEventId() {
    this.af.database.list('/events')
      .map(list => list.length)
      .subscribe(length => this.eventId = length++);
  }
}
