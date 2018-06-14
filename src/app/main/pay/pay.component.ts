import { Component, OnInit, OnDestroy, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { formatNumber } from '@angular/common';
import { Router, ParamMap, Event, NavigationStart } from '@angular/router';
import { Establishment } from '../../core/api/models/api.establishment';
import { PayService } from './pay.service';
import { UIService } from '../../core/ui/ui.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit, OnDestroy {
    card: any = {
        brand: 'Visa',
        number: '1111'
    };
    amount: any;
    establishment: Establishment;
    private routerEventsSubscription: Subscription;
    private keyboardVisibilitySubscription: Subscription;
    inputFocused: boolean;

    constructor(private payService: PayService, private uiService: UIService,
        private router: Router, @Inject(LOCALE_ID) private locale: string) { }

    ngOnInit() {
        this.establishment = this.payService.getEstablishmentToUse();
        console.log('PayComponent: Establishment = %o', this.establishment);
        if (!this.establishment) {
            this.establishment = <Establishment>{
                id: 'EST0005',
                type: 'cafe',
                display_name: 'Venenito Café',
                search_name: 'venenito cafe',
                description: '¿Apoco no se te antoja un cafecito?'
            };
            /* this.router.navigate(['/main']);
            return; */
        }

        this.routerEventsSubscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.uiService.showNav();
            }
        });

        this.keyboardVisibilitySubscription = this.uiService.onKeyboardVisible().subscribe(isKeyboardVisible => {
            this.inputFocused = isKeyboardVisible;
        });

    }

    ngOnDestroy() {
        if (this.routerEventsSubscription) {
            this.routerEventsSubscription.unsubscribe();
        }
        if (this.keyboardVisibilitySubscription) {
            this.keyboardVisibilitySubscription.unsubscribe();
        }
    }

    onCurrencyFocus() {
        this.inputFocused = true;
    }

    onCurrencyBlur() {
        console.log('onCurrencyBlur()');
        this.inputFocused = false;
        this.amount = formatNumber(parseFloat(this.amount), this.locale, '1.2');

        if (this.amount && this.amount > 0) {
            this.showContinue();
        }
    }

    showContinue() {
        console.log('ShowContinue()');
    }

    back() {
        this.router.navigate(['/main/search']);
    }



}
