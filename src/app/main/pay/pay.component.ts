import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ParamMap, Event, NavigationStart } from '@angular/router';
import { Establishment } from '../../core/api/models/api.establishment';
import { PayService } from './pay.service';
import { UIService } from '../../core/ui/ui.service';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit, OnDestroy {

    establishment: Establishment;
    private routerEventsSubscription: Subscription;
    constructor(private payService: PayService, private uiService: UIService, private router: Router) { }

    ngOnInit() {
        this.establishment = this.payService.getEstablishmentToUse();
        console.log('PayComponent: Establishment = %o', this.establishment);

        this.routerEventsSubscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.uiService.showNav();
            }
        });

    }

    ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe();
    }

}
