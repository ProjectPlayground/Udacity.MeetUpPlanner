import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { FORM_EXTENSION_DIRECTIVES, CustomValidatorsService } from './../../shared/form-extensions';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'app-event-details',
  templateUrl: 'event-details.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_EXTENSION_DIRECTIVES],
  styleUrls: ['event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  private formData: FormGroup;
  private eventId: Number;

  constructor(
    private af: AngularFire,
    private fb: FormBuilder,
    private validators: CustomValidatorsService) { }

  ngOnInit() {
    this.getNextEventId();
    this.buildEventForm();
    this.af.auth.subscribe(authState => this.getUser(authState));
  }

  buildEventForm() {
    let now = new Date(Date()).toISOString().slice(0, 16);

    this.formData = this.fb.group({
      created_by: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      host: ['', Validators.required],
      start: [now, Validators.required],
      end: [now, Validators.required],
      location: ['', Validators.required],
      message: ['']
    });
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

  createNewEvent() {

    let userDetails = {
      displayName: this.formData.controls['name'].value,
      dob: this.formData.controls['dob'].value,
      employer: this.formData.controls['employer'].value,
      jobTitle: this.formData.controls['jobTitle'].value
    };

    this.af.database.object(`/events/${this.getNextEventId()}`).update(userDetails);
  }


  getNextEventId() {
    this.af.database.list('/events')
      .map(list => list.length)
      .subscribe(length => this.eventId = length++);
  }
}
