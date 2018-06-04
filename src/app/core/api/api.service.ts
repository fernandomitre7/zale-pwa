import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { CoreModule } from '../core.module';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { ApiError, ErrorClientStatus } from './api.error';

@Injectable({
  providedIn: CoreModule
})
export class ApiService {
  private API_URL: string;
  private apiToken: string;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.apiToken
    })
  };

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.API_URL = environment.apiURL;
    } else {
      this.API_URL = 'assets';
    }
  }

  private handleError(error: HttpErrorResponse) {
    const apiError = new ApiError();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      apiError.message = error.error.message;
      apiError.status = ErrorClientStatus;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      apiError.message = error.message;
      apiError.status = error.status;
    }
    // return an observable with a user-facing error message
    return throwError(apiError);
  }
  createTokens(userAuth: UserAuth): Observable<Tokens> {
    const url = `${this.API_URL}/tokens.json`;
    return this.http.post<Tokens>(url, userAuth, this.httpOptions)
      .pipe(
        retry(2), // retry 2 times
        map((tokens: Tokens) => {
          this.httpOptions.headers.set('Authorization', `Bearer ${tokens.access_token}`);
          return tokens;
        }),
        catchError(this.handleError)
      );
  }

}

export class UserAuth {
  constructor(username, password: string) { }

  isValid(): boolean {
    return true;
  }
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface ApiObject {
  isValid(): boolean;
}
