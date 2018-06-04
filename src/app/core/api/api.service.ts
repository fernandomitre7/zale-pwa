import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { CoreModule } from '../core.module';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
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

    /**
     * createTokens: Authenticates User
     *
     * `POST /tokens` to generate AccessToken/RefreshToken pair
     * @param {UserAuth} userAuth the User to authenticate
     */
    createTokens(userAuth: UserAuth): Observable<Tokens> {
        const url = `${this.API_URL}/tokens.json`;
        return this.http.post<Tokens>(url, userAuth, this.httpOptions)
            .pipe(
                retry(2), // retry 2 times
                tap((tokens: Tokens) => {
                    this.httpOptions.headers.set('Authorization', `Bearer ${tokens.access_token}`);
                }),
                catchError(this.handleError)
            );
    }

}

export class UserAuth {

    private GRANT_TYPE_PASSWORD = 'password';
    private USER_TYPE_CLIENT = 'client'; // retailer, business, "establecimiento" ,etc, TODO: DEFINE THEM

    constructor(public username?: string, public password?: string, remember?: boolean) {
        this.grant_type = this.GRANT_TYPE_PASSWORD;
        this.user_type = this.USER_TYPE_CLIENT;
        if (remember !== undefined) {
            this.remember = remember;
        } else {
            this.remember = true;
        }
    }

    grant_type: string;
    user_type: string;
    remember: boolean;

    isValid(): boolean {
        return !!this.username && !!this.password;
    }
}

export interface Tokens {
    access_token: string;
    refresh_token: string;
}

interface ApiObject {
    isValid(): boolean;
}
