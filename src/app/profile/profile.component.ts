import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private uid = null;
  private user;
  private routeParams: any;
  constructor(public af: AngularFire, private route: ActivatedRoute) { }

  ngOnInit() {
    this.af.auth.subscribe(authState => this.checkAuthState(authState));

    this.routeParams = this.route.params.subscribe(p => this.uid = p['uid']);
    this.af.database.object(`/users/${this.uid}`)
      .subscribe( u => this.user = u);
  }

  checkAuthState(authState) {
    console.log(authState);
    if (this.uid !== null) {
      if (authState !== null && authState.auth.uid !== this.uid) {
        // TODO: Create unauthorised/forbidden pages;
        console.log('send 403');
      }
    }
  }

  ngOnDestroy() {
    // this.routeParams.unsuscribe();
  }
}
