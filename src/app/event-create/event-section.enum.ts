export enum EventSections {
  Details,
  Guests,
  Location,
  Message
}

export class EventSection {
  constructor(public section: EventSections) {}
}