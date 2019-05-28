import { Injectable } from '@angular/core';
import { MainModule } from '../main.module';
import { Establishment, Card, Receipt } from 'src/app/core/api/models';

@Injectable({
    providedIn: 'root'
})
export class PayService {
    // The establishment user is goint to pay in

    private establishment: Establishment;
    private card: Card;
    private receipt: Receipt;

    constructor() { }

    useEstablishment(est: Establishment) {
        this.establishment = est;
    }

    getEstablishmentToUse(): Establishment {
        return this.establishment;
    }

    useCard(card: Card) {
        this.card = card;
    }

    getCardToTuse(): Card {
        return this.card;
    }

    setReceipt(receipt: Receipt) {
        this.receipt = receipt;
    }
    getReceipt(): Receipt {
        return this.receipt;
    }

    restart() {
        this.establishment = null;
        this.card = null;
        this.receipt = null;
    }
}

