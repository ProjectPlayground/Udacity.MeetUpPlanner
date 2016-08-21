import { Component, OnInit, Input } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { EventTypeModel } from './../models/event-type.model';
import { ValidatedInputComponent } from './validated-input.component';

@Component({
    moduleId: module.id,
    selector: 'event-type-select',
    directives: [REACTIVE_FORM_DIRECTIVES, ValidatedInputComponent],
    templateUrl: 'event-type-select.component.html'
})
export class EventTypeSelectComponent implements OnInit {

    @Input() control: FormControl;
    private eventTypeList: EventTypeModel[] = [];
    constructor(private af: AngularFire) { }

    ngOnInit() {
        this.af.database.list('/event_types')
            .subscribe(list => this.eventTypeList = list);
    }

}
