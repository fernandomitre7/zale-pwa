import { Component, OnInit } from '@angular/core';
import { UIService } from '../core/ui/ui.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    hideNav: boolean;
    private forceHideNave: boolean;
    hideHeader: boolean;

    constructor(private uiService: UIService, private router: Router, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.hideNav = false;
        this.uiService.onKeyboardVisible().subscribe(isKeyboardVisible => {
            this.hideNav = this.forceHideNave || isKeyboardVisible;
        });

        this.uiService.onNavVisibility().subscribe(visible => {
            this.forceHideNave = !visible;
            this.hideNav = !visible;
        });

        this.uiService.onMainHeaderVisibility().subscribe(visible => {
            this.hideHeader = !visible;
        });
    }
}
