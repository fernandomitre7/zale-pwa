import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    user: AuthUser;
    submitting: boolean;
    isRegistration: boolean;
    error: string;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.user = {};
        this.submitting = false;
        this.isRegistration = false;
    }


    submit() {
        this.error = null;
        if (this.isRegistration) {
            this.registerNewUser(this.user);
        } else {
            this.signInUser(this.user);
        }
    }

    showRegister() {
        this.isRegistration = true;
        return false;
    }

    showSignIn() {
        this.isRegistration = false;
        return false;
    }

    private signInUser(user: AuthUser) {
        if (!user.username || !user.password) {
            alert('Usuario y contraseña son requeridos.');
            return;
        }
        this.submitting = true;
        this.authService.login(this.user.username, this.user.password)
            .subscribe({
                next: (success: string) => {
                    console.log('signIn succesful! msg: %s', success);
                    const redirectURL = this.authService.redirectURL ?
                        this.authService.redirectURL : '/main';
                    this.router.navigate([redirectURL]);
                },
                error: (err: string) => {
                    console.error('signIn Error: %s', err);
                    this.error = err;
                    this.submitting = false;
                },
                complete: () => {
                    console.log('signIn Completed, remove spinner');
                    this.submitting = false;
                }
            });
    }

    private registerNewUser(user: AuthUser) {
        if (!user.username || !user.password) {
            alert('Usuario y contraseña son requeridos.');
            return;
        }
        if (user.password !== user.confirm_password) {
            alert('Contraseñas no son iguales.');
            return;
        }

        this.submitting = true;
        this.authService.register(user.username, user.password, user.confirm_password)
            .subscribe((success: string) => {
                const redirectURL = this.authService.redirectURL ?
                    this.authService.redirectURL : '/auth/registered';
                this.router.navigate([redirectURL]);
            }, (err: string) => {
                console.error('Register Error: %s', err);
            }, () => {
                console.log('Register Completed');
                this.submitting = false;
            });

    }
}

interface AuthUser {
    username?: string;
    password?: string;
    confirm_password?: string;
}
