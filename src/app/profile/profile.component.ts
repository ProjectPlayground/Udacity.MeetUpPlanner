import { Component, OnInit, OnDestroy } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup } from '@angular/forms';
import { CORE_DIRECTIVES } from '@angular/common';
import { ActivatedRoute }  from '@angular/router';
import { AngularFire } from 'angularfire2';
import { UserModel } from './../shared';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  directives: [CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  styleUrls: ['./../app.component.css', 'profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private uid = null;
  private user: UserModel = new UserModel();
  private routeParams: any;
  private formData: FormGroup;

  constructor(
    public af: AngularFire,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.buildUpdateForm();
    this.af.auth.subscribe(authState => this.checkAuthState(authState));

    this.routeParams = this.route.params.subscribe(p => this.uid = p['uid']);

    this.af.database.object(`/users/${this.uid}`)
      .subscribe(u => {
        this.user = u;
        this.buildUpdateForm();
      });
  }

  checkAuthState(authState) {
    if (this.uid !== null ||
          (authState !== null && authState.auth.uid !== this.uid)) {
        // TODO: Create unauthorised/forbidden pages;
        console.log('send 403');
    }
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

  ngOnDestroy() {
    //this.routeParams.unsuscribe();
  }
}
