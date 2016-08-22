import { Inject, forwardRef } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { EventModel } from './../shared';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

export class EventListResolver implements Resolve<EventModel[]> {
    constructor( @Inject(forwardRef(() => AngularFire)) private af: AngularFire) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventModel[]> {
        
        let userId = route.params['uid'];
        return this.af.database.object(`/events`)
            .take(1)
            .map((eventList) => {
                if (userId != null) {
                    return eventList.filter((event) => event.created_by === route.params['uid']);
                }
                return eventList;
            });
    }
}
