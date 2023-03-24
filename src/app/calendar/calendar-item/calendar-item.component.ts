import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent implements OnInit {
  
  @Input() raceDetails: any;
  hovering = false;
  isPastDate: boolean = false;

  ngOnInit(): void {
    // if current date is greater than race date, then return false
    this.isPastDate = new Date().getTime() > new Date(`${this.raceDetails.date} ${this.raceDetails.time}`).getTime();
  }
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.hovering = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hovering = false;
  }

}
