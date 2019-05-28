import { Component, OnInit, OnDestroy, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { formatNumber } from '@angular/common';
import { Router } from '@angular/router';
import { Establishment } from '../../core/api/models/api.establishment';
import { PayService } from './pay.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { Card, Receipt, ApiError } from 'src/app/core/api/models';
import { UIService, getIcon } from 'src/app/core/ui';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit, OnDestroy {

    paymentSubmitted: boolean = false;
    amount: any;
    establishment: Establishment;
    card: Card;
    error: string;

    private routerEventsSubs: Subscription;
    private keyboardVisibilitySubs: Subscription;
    private cardSubs: Subscription;

    inputFocused: boolean;

    constructor(
        private apiService: ApiService,
        private payService: PayService,
        private uiService: UIService,
        private router: Router,
        @Inject(LOCALE_ID) private locale: string) {
    }

    ngOnInit() {
        this.establishment = this.payService.getEstablishmentToUse();
        this.card = this.payService.getCardToTuse();

        console.log('PayComponent: Establishment = %o', this.establishment);
        console.log('PayComponent: card = %o', this.card);

        if (!this.establishment) {
            /*       this.establishment = <Establishment>{
                      id: 'EST0005',
                      type: 'cafe',
                      display_name: 'Venenito Café',
                      search_name: 'venenito cafe',
                      description: '¿Apoco no se te antoja un cafecito?'
                  }; */
            this.router.navigate(['/main']);
            return;
        }
        if (!this.card) {
            this.cardSubs = this.apiService.getCardDefault().subscribe((card: Card) => {
                this.card = card;
            });
        }

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
        if (this.cardSubs) {
            this.cardSubs.unsubscribe();
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

    getIcon = getIcon

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

    startPayment() {
        console.log('PayComponent: startPayment()');
        this.paymentSubmitted = true;
    }

    confirmPayment() {
        this.uiService.showLoading();
        this.apiService.makeTransaction(this.card, this.establishment, this.amount)
            .subscribe({
                next: (receipt: Receipt) => {
                    this.payService.setReceipt(receipt);
                    this.router.navigate(['/main/receipts', receipt.id, { successful: true }]);
                },
                error: (err: ApiError) => {
                    console.error('PayComponent:confirmPayment err = %o', err);
                    this.error = err.message;
                    this.uiService.hideLoading();
                },
                complete: () => {
                    this.uiService.hideLoading();
                }
            });
    }

}
