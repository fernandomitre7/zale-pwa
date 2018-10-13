import { Component, OnInit, OnDestroy, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { formatNumber } from '@angular/common';
import { Router, ParamMap, Event, NavigationStart } from '@angular/router';
import { Establishment } from '../../core/api/models/api.establishment';
import { PayService } from './pay.service';
import { UIService } from '../../core/ui/ui.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { Card } from '../../core/api/models/api.card';
import { ApiService } from '../../core/api/api.service';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit, OnDestroy {

    defaultCard$: Observable<Card>;

    amount: any;
    establishment: Establishment;

    private routerEventsSubs: Subscription;
    private keyboardVisibilitySubs: Subscription;

    inputFocused: boolean;

    constructor(
        private apiService: ApiService,
        private payService: PayService,
        private uiService: UIService,
        private router: Router,
        @Inject(LOCALE_ID) private locale: string
    ) {
    }

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

        this.defaultCard$ = this.apiService.getCardDefault();

        this.keyboardVisibilitySubs = this.uiService.onKeyboardVisible().subscribe(isKeyboardVisible => {
            this.inputFocused = isKeyboardVisible;
        });

    }

    ngOnDestroy() {
        if (this.routerEventsSubs) {
            this.routerEventsSubs.unsubscribe();
        }
        if (this.keyboardVisibilitySubs) {
            this.keyboardVisibilitySubs.unsubscribe();
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

    changePaymentMethod() {
        this.router.navigate(['/main/payment-methods']);
    }

    validAmount(): boolean {
        return this.amount && parseFloat(this.amount) > 0;
    }

}
