import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },
  {
    path: 'calendar', component: CalendarComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
