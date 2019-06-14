import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

import { ReviewEvent } from "../models/review-event";
import { ReviewEventService } from '../services/review-event.service';
import { Event } from "../models/event";

@Component({
  selector: 'app-create-event-route',
  templateUrl: './create-event-route.component.html',
  styleUrls: ['./create-event-route.component.css']
})
export class CreateEventRouteComponent implements OnInit {
  private event: ReviewEvent;
  private previewEvent: Event;
  private isLoading: boolean;
  private errorMessage: string;
  private successMessage: string;

  public imagePath;
  imgURL: any;

  eventForm = new FormGroup({
    titleFormControl: new FormControl('', [Validators.required]),
    dateFormControl: new FormControl('', [Validators.required]),
    startTimeFormControl: new FormControl('', [Validators.required]),
    descriptionFormControl: new FormControl('', [Validators.required]),
    locationFormControl: new FormControl('', [Validators.required]),
    targetGroupMinFormControl: new FormControl('', [Validators.required]),
    targetGroupMaxFormControl: new FormControl('', [Validators.required]),
    externLinkFormControl: new FormControl(''),
    contactNameFormControl: new FormControl('', [Validators.required]),
    contactEmailFormControl: new FormControl('', [Validators.required]),
    contactPhoneFormControl: new FormControl('', [Validators.required])
  });

  get title() { return this.eventForm.get('titleFormControl'); }
  get date() { return this.eventForm.get('dateFormControl'); }
  get startTime() { return this.eventForm.get('startTimeFormControl'); }
  get description() { return this.eventForm.get('descriptionFormControl'); }
  get location() { return this.eventForm.get('locationFormControl'); }
  get targetGroupMin() { return this.eventForm.get('targetGroupMinFormControl'); }
  get targetGroupMax() { return this.eventForm.get('targetGroupMaxFormControl'); }
  get externLink() { return this.eventForm.get('externLinkFormControl'); }
  get contactName() { return this.eventForm.get('contactNameFormControl'); }
  get contactEmail() { return this.eventForm.get('contactEmailFormControl'); }
  get contactPhone() { return this.eventForm.get('contactPhoneFormControl'); }

  constructor(private reviewEventService: ReviewEventService) { }

  ngOnInit() {
    this.previewEvent = {
      _id: null,
      title: '',
      date: new Date('2020/01/01'),
      description: '',
      location: '',
      targetGroupMin: 0,
      targetGroupMax: 0,
      imageId: '',
      externLink: '',
      status: '',
      eventContact: { name: '', email: '', phone: '' },
      __v: null
    };
    this.event = {
      _id: null,
      title: '',
      date: '',
      description: '',
      location: '',
      targetGroupMin: 0,
      targetGroupMax: 0,
      imageId: 'none',
      externLink: 'none',
      eventContact: { name: '', email: '', phone: '' },
      __v: null
    };

    this.eventForm.statusChanges.subscribe(() => {
      this.event.title = this.title.value;

      let eventDate = new Date(this.date.value);
      if (eventDate.getFullYear() !== NaN && (Number(eventDate.getMonth()) + 1) !== NaN && eventDate.getDate() !== NaN && this.startTime.value !== '') {        
        this.previewEvent.date = new Date(eventDate.getFullYear() + '/' + (Number(eventDate.getMonth()) + 1) + '/' + eventDate.getDate() + ' ' + this.startTime.value);
        this.event.date = this.previewEvent.date.toISOString();
      }

      this.event.description = this.description.value;
      this.event.location = this.location.value;
      this.event.targetGroupMin = this.targetGroupMin.value;
      this.event.targetGroupMax = this.targetGroupMax.value;
      this.event.externLink = this.externLink.value;
      this.event.eventContact.name = this.contactName.value;
      this.event.eventContact.email = this.contactEmail.value;
      this.event.eventContact.phone = this.contactPhone.value;

      this.previewEvent.title = this.event.title;
      this.previewEvent.description = this.event.description;
      this.previewEvent.location = this.event.location;
      this.previewEvent.targetGroupMin = this.event.targetGroupMin;
      this.previewEvent.targetGroupMax = this.event.targetGroupMax;
      this.previewEvent.externLink = this.event.externLink;
      this.previewEvent.eventContact.name = this.event.eventContact.name;
      this.previewEvent.eventContact.email = this.event.eventContact.email;
      this.previewEvent.eventContact.phone = this.event.eventContact.phone;
    });
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  onSubmit() {
    this.successMessage = null;
    this.isLoading = true;
    
    this.reviewEventService.postEvent(this.event).subscribe(response => {   
      this.isLoading = false;
      this.errorMessage = null;
      this.successMessage = 'Event posted succesfully';
    }, err => {
      this.isLoading = false;
      this.successMessage = null;
      this.errorMessage = err
    });
  }
}
