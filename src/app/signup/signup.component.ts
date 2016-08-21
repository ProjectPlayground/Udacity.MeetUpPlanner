import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CORE_DIRECTIVES, NgClass } from '@angular/common';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { AngularFire } from 'angularfire2';
import { FORM_EXTENSION_DIRECTIVES, CustomValidatorsService } from './../shared/form-extensions';


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
    NgClass,
    FORM_EXTENSION_DIRECTIVES
  ],
  providers: [CustomValidatorsService],
  styleUrls: [ './../app.component.css','signup.component.css']
})
export class SignupComponent implements OnInit {

  private formData: FormGroup;
  private showPassHelp: boolean = false;

  constructor(
    private af: AngularFire,
    private fb: FormBuilder,
    private router: Router,
    private validators: CustomValidatorsService) { }

  ngOnInit() {
    this.buildSignUpForm();

    let passwordInput = document.getElementById('pwd');
    passwordInput.onfocus = (() => this.showPassHelp = true);
    passwordInput.onblur = (() => this.showPassHelp = false);
  }

  buildSignUpForm() {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, this.validators.validateEmail])],
      jobTitle: [''],
      employer: [''],
      dob: [''],
      pass: ['',
      Validators.compose(
        [Validators.required,
          Validators.minLength(8),
          this.validators.containsLowerCase,
          this.validators.containsUpperCase,
          this.validators.containsSpecial])],
      passConfirm: ['', Validators.required]
    }, { validator: Validators.compose([this.validators.validatePasswordsMatch, this.validators.passwordIsValid]) });
  }

  createAccount() {
    if (this.formData.dirty && this.formData.valid) {
      this.createUser();
    }
  }

  createUser() {
    console.log(this.formData.controls['email'].value, this.formData.controls['pass'].value);
    this.af.auth.createUser({ email: this.formData.controls['email'].value, password: this.formData.controls['pass'].value })
      .then(u => {
        this.af.database.object(`/users/`).update(this.createUserData(u));
        this.router.navigate(['/Profile', u.uid]);
      })
      .catch(err => console.error(err));
  }

  createUserData(user) {
    let newProfileObj = {};

    newProfileObj[user.uid] = {
      displayName: this.formData.controls['name'].value,
      dob: this.formData.controls['dob'].value,
      employer: this.formData.controls['employer'].value,
      jobTitle: this.formData.controls['jobTitle'].value
    };

    return newProfileObj;
  }
}
