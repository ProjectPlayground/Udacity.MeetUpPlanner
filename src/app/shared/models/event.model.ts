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

export class GuestModel {
    isUser: boolean;
    name: string;
    uid: string;
}
