import { GuestModel } from './guest.model';

export class EventModel {
    created_by: string;
    end: Date;
    event_Type: string;
    event_name: string;
    guests: GuestModel[] = [];
    host: string;
    message: string;
    start: Date;
}