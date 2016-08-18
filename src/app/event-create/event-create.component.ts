import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { EventCreationService } from './event-create.service';
import { CustomValidatorsService } from './../shared/form-extensions';
import { EventDetailsComponent } from './event-details';
import { GuestListComponent } from './guest-list';
import { EventLocationComponent } from './event-location';
import { EventMessageComponent } from './event-message';

import 'rxjs/add/operator/map';

export enum EventSections {
  Details,
  Guests,
  Location,
  Message
}

export class EventSection {
  constructor(public section: EventSections) {}
}

@Component({
  moduleId: module.id,
  selector: 'event-create',
  templateUrl: 'event-create.component.html',
  directives:
  [
    ROUTER_DIRECTIVES,
    EventDetailsComponent,
    GuestListComponent,
    EventLocationComponent,
    EventMessageComponent
  ],
  styleUrls: ['./../app.component.css', 'event-create.component.css'],
  providers: [EventCreationService, CustomValidatorsService]
})
export class EventCreateComponent implements OnInit {

  private newEvent: boolean;
  private formData: FormGroup;
  private eventId: Number;

  private currentSection = new EventSection(EventSections.Details);
  private sections = EventSections;

  constructor(
    private fb: FormBuilder,
    private eventService: EventCreationService,
    private validators: CustomValidatorsService,
    private router: Router,
    private r: ActivatedRoute) {  
    r.data.forEach(d => {
      this.newEvent = d['newEvent'];
    });
    
    this.buildFormData();
  }

  ngOnInit() {
    if (this.newEvent) {
      this.createNewEvent();
    }
  }

  buildFormData() {
    let now = new Date(Date()).toISOString().slice(0, 16);

    this.formData = this.fb.group({
      id: [''],
      created_by: [''],
      event_name: ['', Validators.required],
      event_Type: ['', Validators.required],
      host: ['', Validators.required],
      start: [now, Validators.required],
      end: [now, Validators.required],
      message: ['', Validators.required],
    });
  }


  createNewEvent() {
    this.eventService.generateNextEventId()
      .subscribe(id => this.eventId = id + 1);
  }

  changeSection(section: EventSections) {
    this.currentSection.section = section;
  }
}
