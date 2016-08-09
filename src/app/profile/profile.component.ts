import { Component, OnInit, OnDestroy } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute }  from '@angular/router';
import { AngularFire } from 'angularfire2';
import { UserDetail } from './../shared';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES ],
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private uid = null;
  private user: UserDetail = new UserDetail();
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
    if (this.uid !== null) {
      if (authState !== null && authState.auth.uid !== this.uid) {
        // TODO: Create unauthorised/forbidden pages;
        console.log('send 403');
      }
    }
  }

  buildUpdateForm() {
    console.log(this.user);
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
    console.log(userDetails);
     this.af.database.object(`/users/${this.uid}`).update(userDetails);
  }

  ngOnDestroy() {
    //this.routeParams.unsuscribe();
  }
}
