import { Component, Input } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup } from '@angular/forms';
import { FORM_EXTENSION_DIRECTIVES } from './../../shared/form-extensions';

@Component({
  moduleId: module.id,
  selector: 'event-location',
  directives: [REACTIVE_FORM_DIRECTIVES, FORM_EXTENSION_DIRECTIVES],
  templateUrl: 'event-location.component.html'
})
export class EventLocationComponent {
  @Input() formData: FormGroup;
  constructor() { }
}
