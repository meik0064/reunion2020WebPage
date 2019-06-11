import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from "../models/event";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Input() public events: Event[];
  @Input() public page: number;
  @Input() public pages: Array<number>;
  @Input() public inputSearchString: string;
  @Input() public inputSearchDate: Date;
  @Input() public inputDecending: boolean;
  @Output() searchEmitter: EventEmitter<{ search: string, date: Date, descending: boolean }>;
  @Output() pageNextPrevEmitter: EventEmitter<boolean>;

  private searchString: string;
  private searchDate: Date;
  private descending: boolean;

  private btnNextDisabled = false;
  private btnPreviousDisabled = false;

  searchForm = new FormGroup({
    searchStringForm: new FormControl(this.searchString, []),
    searchDateForm: new FormControl(this.searchDate, []),
    descendingForm: new FormControl(this.descending, [])
  });

  get searchStringForm() { return this.searchForm.get('searchStringForm'); }
  get searchDateForm() { return this.searchForm.get('searchDateForm'); }
  get descendingForm() { return this.searchForm.get('descendingForm'); }  

  constructor(private eventService: EventService) {
    this.searchEmitter = new EventEmitter(); 
    this.pageNextPrevEmitter = new EventEmitter();   
  }

  ngOnInit() {   
    this.searchStringForm.setValue(this.inputSearchString);
    this.searchDateForm.setValue(this.inputSearchDate);
    this.descendingForm.setValue(this.inputDecending);  
    if(this.page <= 1){
      this.btnPreviousDisabled = true;
    } 
    if(this.page >= this.pages[this.pages.length - 1]){
      this.btnNextDisabled = true;
    }
  }

  onSearch() {
    let toEmit = { search: '', date: null, descending: false };
    let searchDate = null;
    let searchString = null;
    let searchDescending = null;
    if (this.searchDateForm.value) {
      searchDate = new Date(this.searchDateForm.value);     
    }
    toEmit = { search: this.searchStringForm.value, date: searchDate, descending: this.descendingForm.value };
    this.searchEmitter.emit(toEmit);
  }

  pageNextPrevClick(val){
    // next will emit true
    // previous will emit false
    this.pageNextPrevEmitter.emit(val);
  }
}
