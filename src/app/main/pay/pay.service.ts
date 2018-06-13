import { Injectable } from '@angular/core';
import { MainModule } from '../main.module';
import { Establishment } from '../../core/api/models/api.establishment';

@Injectable({
    providedIn: 'root'
})
export class PayService {
    // The establishment user is goint to pay in

    private establishment: Establishment;

    constructor() { }

    useEstablishment(est: Establishment) {
        this.establishment = est;
    }

    getEstablishmentToUse(): Establishment {
        return this.establishment;
    }
}
