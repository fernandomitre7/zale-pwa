import { ApiObject } from '../api.service';
import { Card } from './api.card';

export class User implements ApiObject {
    id?: string;
    username: string;
    password?: string;
    confirm_password?: string;

    cards: Card[];

    constructor() { }

    isValid() {
        return !!this.username && this.password === this.confirm_password;
    }
}
