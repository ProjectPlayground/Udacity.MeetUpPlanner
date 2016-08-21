import { Inject, forwardRef } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { UserModel } from './../shared';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

export class ProfileDataResolver implements Resolve<UserModel> {
    constructor( @Inject(forwardRef(() => AngularFire)) private af: AngularFire) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> {
        return this.af.database.object(`/users/${route.params['uid']}`)
            .take(1)
            .map((user) => { return user; });
    }
}
