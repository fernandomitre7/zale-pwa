import { ApiObject } from '../api.service';

export class Transaction implements ApiObject {

    id?: string;
    payment_method_id: string;
    establishment_id: string;
    amount: string;

    constructor() { }


    isValid(): boolean {
        return true;
    }
}