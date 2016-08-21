import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'event-details',
  templateUrl: 'event-details.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_EXTENSION_DIRECTIVES, NgClass],
  providers: [EventDataResolver],
  styleUrls: ['../event-create.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input() formData: FormGroup;

  constructor(
    private af: AngularFire,
    private fb: FormBuilder,
    private validators: CustomValidatorsService,
    private eventService: EventCreationService) { }

  ngOnInit() { }
}
