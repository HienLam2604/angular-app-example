import { TUser } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserTableServiceService {
  constructor(private _http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return EMPTY;
  }

  getAllUsers(): Observable<TUser[]> {
    return this._http.get<TUser[]>(environment.mockApi).pipe(
      //handle error
      catchError(this.handleError)
    );
  }

}