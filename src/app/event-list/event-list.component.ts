import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { EventModel } from './../shared';

@Component({
  moduleId: module.id,
  selector: 'app-event-list',
  templateUrl: 'event-list.component.html',
  styleUrls: ['./../app.component.css', 'event-list.component.css']
})
export class EventListComponent implements OnInit {

  private events: EventModel[] = [];

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.af.database.list('\events').subscribe(e => this.events = e);
  }
}
