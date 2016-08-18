import { Inject, forwardRef } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { EventModel } from './../shared';
import { AngularFire } from 'angularfire2';
import { Observable, Subject } from 'rxjs/Rx';

export class EventDataResolver implements Resolve<EventModel> {
    constructor( @Inject(forwardRef(() => AngularFire)) private af: AngularFire) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventModel> {

        // let sub = new Subject<EventModel>();
        // let test = sub.asObservable();
        // this.af.database.object(`/events/${route.params['id']}`)
        //     .subscribe(v => {
        //         console.log(v);
        //         sub.next(v);
        //     });

        return this.af.database.object(`/events/${route.params['id']}`)
        .take(1)
        .map((e) => {
            console.log(e);
            return e;
        });
    }
}
