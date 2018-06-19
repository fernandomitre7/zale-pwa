import { ApiObject } from '../api.service';

export class Card implements ApiObject {
    id?: string;
    creation_date: Date;
    holder_name: string;
    card_number: string;
    cvv2?: string;
    expiration_month: string;
    expiration_year: string;
    // address: Address
    allows_charges: boolean;
    allows_payouts: boolean;
    brand: string;
    type: string;
    bank_name?: string;
    bank_code?: string;
    // customer_id in OpenPay, this should be linked to the User
    customer_id: string;
    points_card?: string;

    constructor() { }

    isValid(): boolean {
        return true;
    }

}
