import { Injectable } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';



export class ValidationMessages {
  valid: boolean;
  message: string;

  constructor(valid, message) {
    this.valid = valid;
    this.message = message;
  }
}


const requiredMessage = 'This field is required';
const passwordMatchMessage = 'Passwords do not match';
const invalidEmailMessage = 'Not a valid email';
const invalidPassword = 'Password is not valid';

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

  validateEmail(control: FormControl) {
    if (control.value
      .match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'valdiateEmail': true };
    }
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
  }

  buildFormErrorMessages(formGroup: FormGroup) {
    if (formGroup.hasError('passwordMatch')) {
      this.errorMessage.push(passwordMatchMessage);
    }

    if (formGroup.hasError('invalidPassword')) {
      this.errorMessage.push(invalidPassword);
    }
  }
}
