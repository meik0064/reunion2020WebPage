import { Component, OnInit } from '@angular/core';
import { ReviewEvent } from "../models/review-event";
import { EventService } from "../services/event.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  private event: ReviewEvent;

  eventForm = new FormGroup({
    titleFormControl: new FormControl('', [Validators.required]),
    dateFormControl: new FormControl('', [Validators.required]),
    descriptionFormControl: new FormControl('', [Validators.required]),
    locationFormControl: new FormControl('', [Validators.required]),
    targetGroupMinFormControl: new FormControl('', [Validators.required]),
    targetGroupMaxFormControl: new FormControl('', [Validators.required])
  });

  
  public imagePath;
  imgURL: any;

  constructor(private eventService: EventService) { }

  ngOnInit() { 
      this.event = {
        _id: null,
        title: null,
        date: null,
        description: null,
        location: null,
        targetGroupMin: null,
        targetGroupMax: null,
        imageId: null,
        externLink: '',
        eventContact: { name: 'mock-name', email: 'mock@mail.dk', phone: '11223344' },
        __v: null    
      };
      
      this.eventForm.statusChanges.subscribe(() => {
         this.event.title = this.title.value;
         this.event.date = this.date.value;
         this.event.description = this.description.value;
         this.event.location = this.location.value;
         this.event.targetGroupMin = this.targetGroupMin.value;
         this.event.targetGroupMax = this.targetGroupMax.value;
         //this.event.externLink = this.externLink.value; <-- implement
         //this.event.eventContact.name = this.name.value <-- implement
         //this.event.eventContact.email = this.email.value <-- implement
         //this.event.eventContact.phone = this.phone.value <-- implement
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

  get title() { return this.eventForm.get('titleFormControl'); }
  get date() { return this.eventForm.get('dateFormControl'); }
  get description() { return this.eventForm.get('descriptionFormControl'); }
  get location() { return this.eventForm.get('locationFormControl'); }
  get targetGroupMin() { return this.eventForm.get('targetGroupMinFormControl'); }
  get targetGroupMax() { return this.eventForm.get('targetGroupMaxFormControl'); }
}
