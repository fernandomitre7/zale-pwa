import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    signInUser: SignInUser;
    submitting: boolean;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.signInUser = {};
        this.submitting = false;
    }


    submit() {
        if (this.signInUser.username && this.signInUser.password) {
            this.submitting = true;
            this.authService.login(this.signInUser.username, this.signInUser.password)
                .subscribe((success: string) => {
                    console.log('signIn succesful! msg: %s', success);
                    const redirectURL = this.authService.redirectURL ?
                        this.authService.redirectURL : '/main/search';
                    this.router.navigate([redirectURL]);
                }, (err: string) => {
                    console.error('signIn Error: %s', err);
                }, () => {
                    console.log('signIn Completed, remove spinner');
                    this.submitting = false;
                });
        }
    }
}

interface SignInUser {
    username?: string;
    password?: string;
}
