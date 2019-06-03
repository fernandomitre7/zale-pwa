import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CoreModule } from '../core.module';
import { environment } from '../../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { ApiError, ErrorStatus, UserAuth, Tokens, User } from './models';
import { Establishment } from './models/api.establishment';
import { Card } from './models/api.card';
import { Transaction } from './models/api.transaction';
import { Receipt } from './models/api.receipt';

@Injectable({
    providedIn: CoreModule
})
export class ApiService {
    private API_VERSION: string;
    private apiToken: string;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        withCredentials: true
    };

    constructor(private http: HttpClient) {
        this.API_VERSION = environment.apiVersion;
    }
    private is_auth = false;
    hasAuthorization(): boolean {
        /* const auth = this.httpOptions.headers.get('Authorization');
        console.log(`ApiService hasAuthorization: ${!!auth}`);
        return !!auth; */
        return this.is_auth;
    }
    removeAuthorization() {
        /*         this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
         */
        this.is_auth = false;
    }
    setAuthorization() {
        /* console.log(`ApiService setAuthorization: ${token}`);
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
        console.log('ApiService setAuthorization: %o', this.httpOptions.headers); */
        this.is_auth = true;
    }
    /**
     * Handles an error comming from the httClient
     * @param {HttpErrorResponse} error The Error received from httpClient
     * @returns {Observable<ApiError>} ApiError
     */
    private handleError(error: HttpErrorResponse) {
        const apiError = new ApiError();
        let msg: string;
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
            apiError.status = ErrorStatus.ClientError;
            apiError.message = 'Ocurrió un error en la red. ¿Estás conectado a internet?';
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${JSON.stringify(error.error)}`);
            apiError.status = error.status;
            apiError.message = apiError.status !== ErrorStatus.ClientError ? error.error.message : 'Ocurrió un error en la red. ¿Estás conectado a internet?';
        }

        if (apiError.status === ErrorStatus.Unauthorized) {
            window.location.reload();
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
        const url = `${this.API_VERSION}/auth/tokens`;
        let method: Observable<Tokens>;

        return this.http.post<Tokens>(url, userAuth, this.httpOptions)
            .pipe(
                retry(2), // retry 2 times
                tap((tokens: Tokens) => {
                    this.setAuthorization();
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

    getUser(userId: string = 'me'): Observable<User> {
        const url = `${this.API_VERSION}/users/${userId}`;
        return this.http.get<User>(url, this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
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
                headers: this.httpOptions.headers,
                withCredentials: this.httpOptions.withCredentials
            } : this.httpOptions;
            console.log('ApiService:getEstablishments() options %o', options);
            return this.http.get<Establishment[]>(url, options)
                .pipe(
                    catchError(this.handleError)
                );
        }
        return of([]);
    }

    getCards(): Observable<Card[]> {
        const url = `${this.API_VERSION}/users/me/cards`;

        return this.http.get<Card[]>(url, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getCard(card_id: string): Observable<Card> {
        const url = `${this.API_VERSION}/users/me/cards/${card_id}`;

        return this.http.get<Card>(url, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    getCardDefault(): Observable<Card> {
        const url = `${this.API_VERSION}/users/me/cards?default=true&_limit=1`;
        return this.http.get<Card[]>(url, this.httpOptions)
            .pipe(
                map((cards: Card[]) => {
                    if (cards && cards.length > 0) {
                        return cards[0];
                    }
                }),
                catchError(this.handleError)
            );
    }

    createCard(card: Card): Observable<Card> {
        // FOR TESTING PURPOSES ONLY, WITH SERVER UP AND RUNNING THE RETURNING CARD WILL BE OK
        const brand = card.card_number.startsWith('4') ? 'visa' :
            card.card_number.startsWith('5') ? 'mastercard' :
                card.card_number.startsWith('5') ? 'amex' : 'discover';
        card.brand = brand;

        const nums = card.card_number.split(' ');
        card.card_number = nums[nums.length - 1];

        const url = `${this.API_VERSION}/users/me/cards`;
        return this.http.post<Card>(url, card, this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    updateCard(card: Card): Observable<Card> {
        const url = `${this.API_VERSION}/users/me/cards/${card.id}`;
        return this.http.post<Card>(url, card, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    makeTransaction(card: Card, establishment: Establishment, amount: string): Observable<Receipt> {
        const t = new Transaction();
        t.payment_method_id = card.id;
        t.establishment_id = establishment.id;
        t.amount = amount;
        const url = `${this.API_VERSION}/users/me/transactions`;
        return this.http.post<Receipt>(url, t, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getReceipts(): Observable<Receipt[]> {
        const url = `${this.API_VERSION}/users/me/receipts`;

        return this.http.get<Receipt[]>(url, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getReceipt(receiptID: string): Observable<Receipt> {
        const url = `${this.API_VERSION}/users/me/receipts/${receiptID}`;

        return this.http.get<Receipt>(url, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
}

export interface ApiObject {
    isValid(): boolean;
}
