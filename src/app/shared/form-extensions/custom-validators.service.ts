import { Injectable } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';

const requiredMessage = 'This field is required';
const passwordMatchMessage = 'Passwords do not match';
const invalidEmailMessage = 'Not a valid email';
const invalidPassword = 'Password is not valid';

const startBeforeNow = 'Start time cannot be earlier than current date and time';
const startLaterThanYear = 'Start time cannot be more than year from now';
const endIsBeforeStart = 'End Time cannot be before start time';

@Injectable()
export class CustomValidatorsService {

  private errorMessage: string[];

  required(control: FormControl) {
    let regex = new RegExp('(^$)');
    return !regex.test(control.value) ? null : { 'required': true };
  }

  validatePasswordsMatch(group: FormGroup) {
    return group.controls['pass'].value === group.controls['passConfirm'].value ? null : { 'passwordMatch': true };
  }

  endIsAfterStart(group: FormGroup) {
    let start = moment(group.controls['start'].value);
    let end = moment(group.controls['end'].value);
    let startTime = new Date(group.controls['start'].value).getTime();
    let endTime = new Date(group.controls['end'].value).getTime();

    return start < end ? null : { 'endIsBeforeStart': true };
  }

  passwordIsValid(group: FormGroup) {
    return group.controls['pass'].valid ? null : { 'invalidPassword': true };
  }

  containsUpperCase(control: FormControl) {
    let regex = new RegExp('(?=.*?[A-Z])');
    return regex.test(control.value) ? null : { 'containsUpperCase': true };
  }

  containsLowerCase(control: FormControl) {
    let regex = new RegExp('(?=.*?[a-z])');
    return regex.test(control.value) ? null : { 'containsLowerCase': true };
  }

  containsSpecial(control: FormControl) {
    let regex = new RegExp('(?=.*?[#?!@$%^&*-])');
    return regex.test(control.value) ? null : { 'containsSpecial': true };
  }

  notEarlierThanYesterday(control: FormControl) {
    let enteredVal = new Date(control.value);
    let now = new Date(Date.now());
    let yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
      0, 0, 0, 0
    );

    if (enteredVal < yesterday) {
      return { 'earlierThanNow': true };
    }
  }

  notOverAYearAway(control: FormControl) {
    let enteredVal = new Date(control.value);
    let now = new Date(Date.now());
    let nextYear = new Date(
      now.getFullYear() + 1,
      now.getMonth(),
      now.getDate(),
      0, 0, 0, 0
    );

    if (nextYear < enteredVal) {
      return { 'validateOverYear': true };
    }
  }

  validateEmail(control: FormControl) {
    let regex = new RegExp('([a-z0-9._%+-])+@([a-z0-9.-])+.([a-z])');
    return regex.test(control.value) ? null : { 'validateEmail': true };
  }

  buildErrorMessages(control: FormControl, formGroup: FormGroup) {

    this.errorMessage = [];
    this.buildControlErrorMessages(control);

    if (formGroup != null) {
      this.buildFormErrorMessages(formGroup);
    }

    return this.errorMessage;
  }

  buildControlErrorMessages(control: FormControl) {

    if (control.hasError('required')) {
      this.errorMessage.push(requiredMessage);
    }

    if (control.hasError('passwordMatch')) {
      this.errorMessage.push(passwordMatchMessage);
    }

    if (control.hasError('validateEmail')) {
      this.errorMessage.push(invalidEmailMessage);
    }

    if (control.hasError('earlierThanNow')) {
      this.errorMessage.push(startBeforeNow)
    }

    if (control.hasError('validateOverYear')) {
      this.errorMessage.push(startLaterThanYear);
    }
  }

  buildFormErrorMessages(formGroup: FormGroup) {
    if (formGroup.hasError('passwordMatch')) {
      this.errorMessage.push(passwordMatchMessage);
    }

    if (formGroup.hasError('invalidPassword')) {
      this.errorMessage.push(invalidPassword);
    }

    if (formGroup.hasError('endIsBeforeStart')) {
      this.errorMessage.push(endIsBeforeStart);
    }
  }
}
