import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { AngularFire } from 'angularfire2';


@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  directives:
  [
    CORE_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    ACCORDION_DIRECTIVES,
  ],
  styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {

  private formData: FormGroup;

  constructor(public af: AngularFire, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildSignUpForm();
  }

  buildSignUpForm() {
    this.formData = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      passConfirm: new FormControl('', Validators.required),
      jobTitle: new FormControl(''),
      employer: new FormControl(''),
      dob: new FormControl('')
    });
  }

  createAccount(event) {
    if (this.formData.dirty && this.formData.valid) {
      this.af.auth.createUser({ email: this.formData.controls['email'].value, password: this.formData.controls['pass'].value })
        .then(u => this.af.database.list('/users')
            .push(this.createUserData(u)));
    } else {
      console.log('not valid');
    }
  }

  createUserData(user) {
    let newProfileObj = {};

    newProfileObj[user.uid] = {
      displayName: this.formData.controls['name'].value,
      dob: this.formData.controls['dob'].value,
      email: this.formData.controls['email'].value,
      employer: this.formData.controls['employer'].value,
      jobTitle: this.formData.controls['jobTitle'].value
    }

    console.log(newProfileObj);

    return newProfileObj;
  }
}
