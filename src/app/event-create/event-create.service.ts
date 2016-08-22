import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class EventCreationService {

    constructor(private af: AngularFire) { }

    generateNextEventId() {
        return this.af.database.list('/events')
            .map(list => list.length);
    }
}
