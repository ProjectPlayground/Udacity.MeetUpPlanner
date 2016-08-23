import { Component, Input, AfterViewInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { FORM_EXTENSION_DIRECTIVES } from './../../shared/form-extensions';
import 'rxjs/add/operator/map';
import { EventDataResolver } from './../event.resolver';
import { EventCreationService } from './../event-create.service';

@Component({
  moduleId: module.id,
  selector: 'event-details',
  templateUrl: 'event-details.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_EXTENSION_DIRECTIVES, NgClass],
  providers: [EventDataResolver],
  styleUrls: ['../event-create.component.css']
})
export class EventDetailsComponent implements AfterViewInit {

  @Input() formData: FormGroup;

  ngAfterViewInit() {
    document.getElementById('name').focus();
  }
}
