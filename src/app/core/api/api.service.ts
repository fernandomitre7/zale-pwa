import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
    HttpParams
} from '@angular/common/http';
import { CoreModule } from '../core.module';
import { environment } from '../../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import {
    ApiError,
    ErrorClientStatus,
    UserAuth,
    Tokens,
    User
} from './models';
import { Establishment } from './models/api.establishment';

@Injectable({
    providedIn: CoreModule
})
export class ApiService {
    private API_VERSION: string;
    private apiToken: string;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
        this.API_VERSION = environment.apiVersion;
    }

    hasAuthorization(): boolean {
        const auth = this.httpOptions.headers.get('Authorization');
        return !!auth;
    }
    removeAuthorization() {
        this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    }
    setAuthorization(token: string) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }
    /**
     * Handles an error comming from the httClient
     * @param {HttpErrorResponse} error The Error received from httpClient
     * @returns {Observable<ApiError>} ApiError
     */
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
     * Authenticates User
     *
     * `POST /tokens` to generate AccessToken/RefreshToken pair
     * @param {UserAuth} userAuth the User to authenticate
     */
    createTokens(userAuth: UserAuth): Observable<Tokens> {
        const url = `${this.API_VERSION}/tokens`;
        let method: Observable<Tokens>;
        // NOTE: This is only in the meantime Local/Dev backend is not ready
        if (environment.production) {
            method = this.http.post<Tokens>(url, userAuth, this.httpOptions);
        } else {
            method = this.http.get<Tokens>(url, this.httpOptions);
        }
        return method
            .pipe(
                retry(2), // retry 2 times
                tap((tokens: Tokens) => {
                    this.setAuthorization(tokens.access_token);
                }),
                catchError(this.handleError)
            );
    }

    /**
     * Creates a new User
     *
     *  `POST /users`
     * @param {User} user the User to create
     */
    createUser(user: User): Observable<User> {
        const url = `${this.API_VERSION}/users`;
        return this.http.post<User>(url, user, this.httpOptions)
            .pipe(
                retry(2), // retry 2 times
                catchError(this.handleError)
            );
    }

    /**
     * Get Establishments
     *
     *  `GET /establishments?search_name={search_name}
     * @param search_name optional parameter to search establishments by name
     */
    getEstablishments(search_name?: string): Observable<Establishment[]> {
        const url = `${this.API_VERSION}/establishments`;
        if (search_name && search_name.length > 0) {
            const options = search_name !== '*' ? {
                params: new HttpParams().set('q', search_name),
                headers: this.httpOptions.headers
            } : this.httpOptions;
            return this.http.get<Establishment[]>(url, options)
                .pipe(
                    catchError(this.handleError)
                );
        }
        return of([]);
    }

}

export interface ApiObject {
    isValid(): boolean;
}
