import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  raceCalendar: any = {};
  raceCalendarLoading: boolean = true;
  raceCalendarSubscription: Subscription = new Subscription();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.raceCalendarSubscription = this.dataService.getCalendar().subscribe(results => {
      this.raceCalendar = results.MRData.RaceTable;
      console.log(this.raceCalendar);
      this.raceCalendarLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.raceCalendarSubscription.unsubscribe();
  }

}
