import { Component, OnInit, Input } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { EventModel } from './../shared';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-event-list',
  templateUrl: 'event-list.component.html',
  styleUrls: ['./../app.component.css', 'event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input() userId;
  @Input() allowEdit = false;

  private events: EventModel[] = [];

  constructor(
    private af: AngularFire,
    private route: ActivatedRoute) {
    route.data.forEach(d => console.log(d));
  }

  ngOnInit() {
    this.af.database.list('\events').subscribe(e => this.events = e);
  }
}
