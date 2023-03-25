import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ResultComponent } from './result/result.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent },
  { path: 'results', children: [
      {path: ':year/:round', component: ResultComponent,},
    ]
  },
  { path: 'auth', component: AuthComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
