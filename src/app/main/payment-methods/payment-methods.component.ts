import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { wait } from 'src/app/core/ui/click-wait';
import { Card } from '../../core/api/models/api.card';

@Component({
    selector: 'app-payment-methods',
    templateUrl: './payment-methods.component.html',
    styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

    cards = [
        { brand: 'Visa', number: '1111' },
        { brand: 'Master Card', number: '2222' },
        { brand: 'American Express', number: '5555' }
    ];



    newCard: Card;
    newCardExp: string;

    cardWidth: number;

    addingNewMethod: boolean;

    constructor(private router: Router) { }

    ngOnInit() {
        this.addingNewMethod = false;
        this.cardWidth = window.innerWidth <= 350 ? 300 : 350;
        this.newCard = new Card();
    }

    back() {
        this.router.navigate(['/main/pay']);
    }


    async showAddNewMethod() {
        await wait(150);
        this.addingNewMethod = true;
    }

    async cancel() {
        await wait(150);
        this.addingNewMethod = false;
    }

    async addNewCard() {
        await wait(150);
        console.log('Card: %o, expDate: %o', this.newCard, this.newCardExp);
        this.addingNewMethod = false;
    }

}
