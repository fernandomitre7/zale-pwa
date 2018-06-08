import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from '../core/api/api.service';
import {
    ApiError,
    UserAuth,
    User,
    Tokens
} from '../core/api/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    redirectURL: string;

    constructor(private api: ApiService) { }

    isLoggedIn() {
        return true; // this.api.hasAuthorization();
    }

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
                    return 'Inicio de sesión exitoso.';
                }),
                catchError(this.handleApiError)
            );
    }

    public logout() {
        // TODO: remove from local storage
        this.api.removeAuthorization();
        return;
    }

    public register(username, password, confirm_password: string): Observable<string> {
        const user = new User();
        user.username = username;
        user.password = password;
        user.confirm_password = confirm_password;
        return this.api.createUser(user)
            .pipe(
                map((newUser: User) => {
                    console.log('AuthService:register() New User: %o', newUser);
                    return 'Registro exitoso';
                }),
                catchError(this.handleApiError)
            );
    }



}
