import { ApiObject } from '../api.service';
import { Establishment } from './api.establishment';
import { Card } from './api.card';

export class Receipt implements ApiObject {

    id?: string;
    payment_method: Card;
    establishment: Establishment;
    user_id: string;
    amout: string;
    created_date: Date;

    constructor() { }


    isValid(): boolean {
        return true;
    }
}