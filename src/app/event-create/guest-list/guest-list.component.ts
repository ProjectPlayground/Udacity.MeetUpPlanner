import { Component, OnInit, Input } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GuestModel, CustomValidatorsService } from './../../shared';
import { ValidatedInputComponent } from './../../shared/form-extensions';

@Component({
  moduleId: module.id,
  selector: 'guest-list',
  templateUrl: 'guest-list.component.html',
  styleUrls: ['guest-list.component.css'],
  directives: [ValidatedInputComponent, REACTIVE_FORM_DIRECTIVES]
})
export class GuestListComponent implements OnInit {

  private guestList: GuestModel[] = [];
  private guestFormData: FormGroup;
  @Input() formData: FormGroup;
  private guestControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private validators: CustomValidatorsService) {
    this.buildGuestForm();
  }

  ngOnInit() {
    this.guestControl = <FormControl>this.formData.controls['guests'];
    if (this.guestControl.value != "") {
      this.guestList = this.guestControl.value;
    }
  }

  addGuest() {
    let guest = new GuestModel(this.guestFormData.controls['name'].value, this.guestFormData.controls['email'].value);
    this.guestList.push(guest);
    this.buildGuestForm();
    this.updateFormData();
  }

  buildGuestForm() {
    this.guestFormData = this.fb.group({
      name: ['', this.validators.required],
      email: ['', Validators.compose([this.validators.required, this.validators.validateEmail])]
    });
  }

  removeGuest(guest: GuestModel) {
    this.guestList.splice(this.guestList.indexOf(guest), 1);
    this.updateFormData();
  }

  updateFormData() {
    this.guestControl.updateValue(this.guestList);
  }
}