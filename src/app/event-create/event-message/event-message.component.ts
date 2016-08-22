import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'event-message',
  templateUrl: 'event-message.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES],
  styleUrls: ['event-message.component.css']
})
export class EventMessageComponent {

  @Input() formData: FormGroup
  constructor() { }

}
