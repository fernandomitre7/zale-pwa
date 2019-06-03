import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, ApiError } from 'src/app/core/api/models';
import { ApiService } from 'src/app/core/api/api.service';
import { UIService } from 'src/app/core/ui';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    error: string;
    user: User;

    constructor(private apiService: ApiService, private uiService: UIService) { }

    ngOnInit() {
        this.getUser();
    }

    private getUser() {
        this.uiService.showLoading();
        this.apiService.getUser()
            .subscribe({
                next: (user: User) => {
                    debugger;
                    this.user = user;
                    this.uiService.hideLoading();
                },
                error: (err: ApiError) => {
                    this.error = err.message;
                    this.uiService.hideLoading();
                }
            })
    }
}
