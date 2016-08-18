import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { EventCreationService } from './event-create.service';
import { FORM_EXTENSION_DIRECTIVES, CustomValidatorsService } from './../shared/form-extensions';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'app-event-create',
  templateUrl: 'event-create.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_EXTENSION_DIRECTIVES, ROUTER_DIRECTIVES],
  styleUrls: ['./../app.component.css', 'event-create.component.css'],
  providers: [EventCreationService, CustomValidatorsService]
})
export class EventCreateComponent implements OnInit {

  private newEvent: boolean;

  constructor(
    private eventService: EventCreationService,
    private validators: CustomValidatorsService,
    private router: Router,
    private r: ActivatedRoute) {
    r.data.forEach(d => {
      this.newEvent = d['newEvent'];
    });
  }

  ngOnInit() {
    if (this.newEvent) {
      this.createNewEvent();
    }
  }

  createNewEvent() {
    this.eventService.generateNextEventId()
      .subscribe(id => this.router.navigate([`event/${id + 1}/details`]));
  }
}
