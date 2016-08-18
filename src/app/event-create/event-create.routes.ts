import { Route} from '@angular/router';
import { GuestListComponent } from './guest-list/guest-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventLocationComponent } from './event-location/event-location.component';
import { EventMessageComponent } from './event-message/event-message.component';
import { EventDataResolver } from './event.resolver';

export const EventCreateRoutes: Route[] = [
    {
        path: ''
    },
    {
        path: ':id/details',
        resolve: {event: EventDataResolver},
        component: EventDetailsComponent
    },
    {
        path: ':id/guests',
        component: GuestListComponent
    },
    {
        path: ':id/location',
        component: EventLocationComponent
    },
    {
        path: ':id/message',
        component: EventMessageComponent
    }
];
