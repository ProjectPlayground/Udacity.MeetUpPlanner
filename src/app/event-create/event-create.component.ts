import { Component, OnInit } from '@angular/core';
import { NgClass} from '@angular/common'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { EventCreationService } from './event-create.service';
import { CustomValidatorsService } from './../shared/form-extensions';
import { EventDetailsComponent } from './event-details';
import { GuestListComponent } from './guest-list';
import { EventLocationComponent } from './event-location';
import { EventMessageComponent } from './event-message';
import { AngularFire } from 'angularfire2';
import { EventSection, EventSections } from './event-section.enum';
import 'rxjs/add/operator/map';

//Display the text
const detailNav = {msg: "Add some Guests", nxtSection: EventSections.Guests, displayPost: false};
const guestNav = {msg: "Choose a location", nxtSection: EventSections.Location, displayPost: false};
const locNav = {msg: "Add a final message", nxtSection: EventSections.Message, displayPost: false};
const msgNav = {msg: null, nxtSection: null, displayPost: true};

@Component({
  moduleId: module.id,
  selector: 'event-create',
  templateUrl: 'event-create.component.html',
  directives:
  [
    ROUTER_DIRECTIVES,
    EventDetailsComponent,
    GuestListComponent,
    EventLocationComponent,
    EventMessageComponent,
    NgClass
  ],
  styleUrls: ['./../app.component.css', 'event-create.component.css'],
  providers: [EventCreationService, CustomValidatorsService]
})
export class EventCreateComponent implements OnInit {

  private newEvent: boolean;
  private formData: FormGroup;
  
  private currentSection = new EventSection(EventSections.Details);
  private currentNav;
  private sections = EventSections;
  private eventId: Number;
  private userId: string;

  constructor(
    private fb: FormBuilder,
    private eventService: EventCreationService,
    private validators: CustomValidatorsService,
    private router: Router,
    private r: ActivatedRoute,
    private af: AngularFire) {  
    r.data.forEach(d => {
      this.newEvent = d['newEvent'];
    });
    //Default first step
    this.currentNav = detailNav;
    this.buildFormData();
  }

  ngOnInit() {
    if (this.newEvent) {
      this.createNewEvent();
    }
  }

  buildFormData() {
    let now = new Date(Date.now());
    console.log(now);
    let start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        9
    );
    
    let finish = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        9
    );


    this.formData = this.fb.group({
      id: [''],
      created_by: [''],
      event_name: ['', Validators.required],
      event_Type: ['', Validators.required],
      host: ['', Validators.required],
      guests: ['', Validators.required],
      start: [start.toISOString().slice(0, 16), Validators.compose([
        Validators.required, 
        this.validators.notEarlierThanYesterday, 
        this.validators.notOverAYearAway
        ])],
      end: [finish.toISOString().slice(0, 16), Validators.required],
      location: ['', Validators.required],
      message: ['']
    }, { validator: Validators.compose([this.validators.endIsAfterStart]) });
  }


  createNewEvent() {
    this.eventService.generateNextEventId()
      .subscribe(id => {
        this.eventId = id + 1;
        (<FormControl>this.formData.controls['id']).updateValue(this.eventId);
      });
      
    this.af.auth.forEach(auth => {
      this.userId = auth.uid;
      (<FormControl>this.formData.controls['created_by']).updateValue(auth.uid);
      this.getUser();
      
    });
    
  }
  
  getUser() {
    this.af.database.object(`/users/${this.userId}`).forEach(u => {
        (<FormControl>this.formData.controls['host']).updateValue(u.displayName);
      })
  }
  
  postEvent() {
    this.af.database.object(`/events/${this.eventId}`).update(this.formData.value);
    this.router.navigate(['profile', this.userId]);
  }

  changeSection(section: EventSections) {
    this.currentSection.section = section;
    this.updateNav();
  }
  
  goToNext() {
    this.currentSection.section = this.currentNav.nxtSection;
    this.updateNav();
  }
  
  updateNav() {
    switch(this.currentSection.section)
    {
      case EventSections.Details:
        this.currentNav = detailNav;
        break;
      case EventSections.Guests: 
        this.currentNav = guestNav;
      break;
      case EventSections.Location:
        this.currentNav = locNav;     
      break;
      default:
        this.currentNav = msgNav;
      break;
    } 
  }
}
