import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ReviewEvent } from 'src/app/models/review-event';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  private innerWidth: any;

  @Input() private event: ReviewEvent;
  @Input() private imgURL: string;

  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
}
