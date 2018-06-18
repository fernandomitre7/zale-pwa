import { ApiObject } from '../api.service';

export class Card implements ApiObject {

    brand: string;
    number: string;

    constructor() { }

    isValid(): boolean {
        return true;
    }

}
