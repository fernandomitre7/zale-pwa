import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanLoad,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Route,
    Router,
    CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(next, state);
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        console.log('AuthGuard:canLoad: route: ', route);

        const url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }

        this.authService.redirectURL = url;

        this.router.navigate(['/auth']);
        return false;
    }
}
