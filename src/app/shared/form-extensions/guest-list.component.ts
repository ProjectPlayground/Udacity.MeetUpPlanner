import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder } from '@angular/forms';
import { GuestModel } from './../models/guest.model';
import { ValidatedInputComponent } from './validated-input.component';

@Component({
    moduleId: module.id,
    selector: 'guest-list',
    templateUrl: 'guest-list.component.html',
    styleUrls: ['./guest-list.component.css'],
    directives: [ValidatedInputComponent, REACTIVE_FORM_DIRECTIVES]
})
export class GuestListComponent implements OnInit {

    private guestList: GuestModel[] = [];
    private guestFormData: FormGroup;
    @Output() finalizeList = new EventEmitter();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.buildGuestForm();
    }

    finishList() {
        this.finalizeList.emit(this.guestList);
    }

    addGuest() {
        let guest = new GuestModel(this.guestFormData.controls['name'].value, this.guestFormData.controls['email'].value);
        console.log(guest);
        this.guestList.push(guest);
        this.buildGuestForm();
    }

    buildGuestForm() {
        this.guestFormData = this.fb.group({
            name: [''],
            email: ['']
        });
    }

}