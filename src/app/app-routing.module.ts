import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoggedinGuard } from './auth/auth-loggedin.guard';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { ResultComponent } from './result/result.component';
import { StandingsComponent } from './standings/standings.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full'},
  { path: 'calendar', component: CalendarComponent },
  { path: 'standings', component: StandingsComponent },
  { path: 'results', canActivate: [AuthGuard], children: [
      {path: ':year/:round', component: ResultComponent,},
    ]
  },
  { path: 'auth', component: AuthComponent, canActivate: [AuthLoggedinGuard] },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
