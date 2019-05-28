import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { wait } from 'src/app/core/ui/click-wait';
import { Card } from '../../core/api/models/api.card';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { PayService } from '../pay/pay.service';
import { ApiError } from '../../core/api/models';

@Component({
    selector: 'app-payment-methods',
    templateUrl: './payment-methods.component.html',
    styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

    private currentCards: Card[] = [];
    cards$: BehaviorSubject<Card[]>;

    newCard: Card;
    newCardExp: string;
    cardWidth: number;
    addingNewMethod: boolean;

    /* //ngx-card html form options
    // Strings for translation - optional
    messages: any = {
        //alidDate: 'valid\ndate', // optional - default 'valid\nthru'
        //monthYear: 'mm/yyyy', // optional - default 'month/year'
    }; */

    // Default placeholders for rendered fields - optional
    placeholders: any = {
        // number: '•••• •••• •••• ••••',
        name: 'Nombre en la Tarjeta',
        //expiry: '••/••',
        //cvc: '•••'
    };

    masks: any = {
        cardNumber: '•' // optional - mask card number
    };

    constructor(private api: ApiService, private payServce: PayService, private router: Router, /* private ref: ChangeDetectorRef */) { }

    ngOnInit() {
        // this.cards$ = new BehaviorSubject<Card[]>(this.currentCards);
        this.getCards();
        this.addingNewMethod = false;
        debugger;
        this.cardWidth = 300;//window.innerWidth <= 350 ? 300 : 350;
        this.newCard = new Card();
    }

    back() {
        this.router.navigate(['/main/pay']);
    }

    selectCard(card: Card) {
        this.payServce.useCard(card);
        this.router.navigate(['/main/pay']);
    }

    getCards() {
        this.api.getCards().subscribe((cards: Card[]) => {
            this.currentCards = cards;
            if (!this.cards$) {
                this.cards$ = new BehaviorSubject<Card[]>(this.currentCards);
            } else {
                this.cards$.next(this.currentCards);
            }
        }, (err: ApiError) => {
            console.error(err);
        });
    }

    async showAddNewMethod() {
        await wait(150);
        /* this.newCard = new Card();
        this.newCardExp = ''; */
        this.addingNewMethod = true;
    }

    async cancel() {
        this.newCard = new Card();
        this.newCardExp = '';
        //this.ref.detectChanges();
        await wait(150);
        this.addingNewMethod = false;
    }

    async addNewCard() {
        // newCardExp = "mm / yy"
        const expDate = this.newCardExp.split('/');
        this.newCard.expiration_month = expDate[0].trim();
        this.newCard.expiration_year = expDate[1].trim();
        console.log('Card: %o, expDate: %o', this.newCard, this.newCardExp);
        this.api.createCard(this.newCard).subscribe((newCard: Card) => {
            this.currentCards.push(newCard);
            this.cards$.next(this.currentCards);
            this.addingNewMethod = false;
        }, (err: ApiError) => {
            console.error(err);
        });
    }

}
