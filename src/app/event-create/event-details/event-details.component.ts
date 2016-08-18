import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { FORM_EXTENSION_DIRECTIVES, CustomValidatorsService } from './../../shared/form-extensions';
import 'rxjs/add/operator/map';
import { EventDataResolver } from './../event.resolver';
import { EventCreationService } from './../event-create.service';

@Component({
  moduleId: module.id,
  selector: 'app-event-details',
  templateUrl: 'event-details.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_EXTENSION_DIRECTIVES, NgClass],
  providers: [EventDataResolver],
  styleUrls: ['../event-create.component.css', 'event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  private formData: FormGroup;
  private event = null;
  private eventId: Number;

  constructor(
    private af: AngularFire,
    private fb: FormBuilder,
    private validators: CustomValidatorsService,
    private eventService: EventCreationService,
    private router: Router,
    private route: ActivatedRoute) {

    this.buildEventForm();
    route.params.forEach(p => this.eventId = p['id']);
    route.data.forEach(d => {
      this.event = d['event'];
    });
  }

  ngOnInit() {
    if (this.event == null) {
      this.newEventLogic();
    }
  }

  newEventLogic() {
    this.af.auth.subscribe(authState => this.getUser(authState));
  }

  buildEventForm() {
    let now = new Date(Date()).toISOString().slice(0, 16);

    this.formData = this.fb.group({
      id: [this.eventId],
      created_by: [''],
      event_name: ['', Validators.required],
      event_type: ['', Validators.required],
      host: ['', Validators.required],
      start: [now, Validators.required],
      end: [now, Validators.required]
    });
  }

  getUser(authState) {

    // TODO tidy this up, more resolvers?
    if (authState != null && authState.auth != null) {
      this.af.database.object(`/users/${authState.auth.uid}`)
        .subscribe(u => {
          (<FormControl>this.formData.controls['host']).updateValue(u.displayName);
        });

      (<FormControl>this.formData.controls['created_by']).updateValue(authState.auth.uid);
    }
  }

  postEventDetails() {
    this.af.database.object(`/events/${this.eventId}`).update(this.formData.value);
  }

  next() {
    this.postEventDetails();
    this.router.navigate([`event/${this.eventId}/guests`]);
  }
}
