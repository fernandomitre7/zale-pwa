import { Injectable } from '@angular/core';
import { ApiService, UserAuth, Tokens } from '../core/api/api.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiError } from '../core/api/api.error';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isLoggedIn = false;
    redirectURL: string;

    constructor(private api: ApiService) { }

    private handleApiError(err: ApiError) {
        const errMsg = `Inicio de sesión falló: ${err.message}`;
        return throwError(errMsg);
    }

    public login(username, password: string): Observable<string> {
        const userAuth = new UserAuth(username, password);
        return this.api.createTokens(userAuth)
            .pipe(
                map((tokens: Tokens) => {
                    // TODO: Store in local storage
                    console.log('AuthService:login() tokens: %o', tokens);
                    this.isLoggedIn = true;
                    return 'Inicio de sesión exitoso.';
                }),
                catchError(this.handleApiError)
            );
    }

    public logout() {
        // TODO: remove from local storage
        this.isLoggedIn = false;
        return;
    }



}
