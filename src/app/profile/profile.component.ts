import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup } from '@angular/forms';
import { CORE_DIRECTIVES } from '@angular/common';
import { ActivatedRoute, Router }  from '@angular/router';
import { AngularFire } from 'angularfire2';
import { UserModel } from './../shared';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  directives: [CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  styleUrls: ['./../app.component.css', 'profile.component.css']
})
export class ProfileComponent implements OnInit {

  private uid = null;
  private user: UserModel = new UserModel();
  private events;
  private formData: FormGroup;

  constructor(
    public af: AngularFire,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    route.params.forEach(p => this.uid = p['uid']);
    route.data.forEach(d => {
      this.events = d['events'];
      this.user = d['user'];
    });
  }

  ngOnInit() {
    this.buildUpdateForm();
  }

  buildUpdateForm() {
    this.formData = this.fb.group({
      name: [this.user.displayName],
      jobTitle: [this.user.jobTitle],
      employer: [this.user.employer],
      dob: [this.user.dob]
    });
  }

  updateUserDetails() {
    let userDetails = {
      displayName: this.formData.controls['name'].value,
      dob: this.formData.controls['dob'].value,
      employer: this.formData.controls['employer'].value,
      jobTitle: this.formData.controls['jobTitle'].value
    };

    this.af.database.object(`/users/${this.uid}`).update(userDetails);
  }

  newEvent() {
    this.router.navigate([`newevent`]);
  }
}
