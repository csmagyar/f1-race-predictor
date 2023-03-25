import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from './responseDate.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    this.autoLogout(expiresIn*1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData',JSON.stringify(user))
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "The email address is already in use by another account.";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "The password is invalid or the user does not have a password.";
        break;
    }

    return throwError(() => new Error(errorMessage));
  }
}
