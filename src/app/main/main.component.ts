import { Component, OnInit } from '@angular/core';
import { UIService } from '../core/ui/ui.service';
import { Router, ActivatedRoute, UrlSegment, Event, NavigationStart } from '@angular/router';

const ShowNavRoutes = ['/main/search', '/main/receipts', '/main/account'];

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    hideNav: boolean;
    private forceHideNave: boolean;
    hideHeader: boolean;

    private isKeyboardVisible: boolean;
    private isRouteWithNav: boolean;

    constructor(private uiService: UIService, private router: Router) { }

    ngOnInit() {
        console.log('Main router.url: %o', this.router.url);
        this.isRouteWithNav = ShowNavRoutes.includes(this.router.url);
        this.hideNav = !this.isRouteWithNav;
        this.uiService.onKeyboardVisible().subscribe(isKeyboardVisible => {
            this.isKeyboardVisible = isKeyboardVisible;
            if (this.isRouteWithNav) { // if this route should have nav
                this.hideNav = this.forceHideNave || isKeyboardVisible;
            }
        });

        this.uiService.onMainHeaderVisibility().subscribe(visible => {
            this.hideHeader = !visible;
        });

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                console.log('Main Router Event: %o', event);
                this.hideNav = !ShowNavRoutes.includes(event.url);
            }
        });
    }
}
