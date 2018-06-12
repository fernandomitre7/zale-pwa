import { ApiObject } from '../api.service';

export class User implements ApiObject {
    id?: string;
    username: string;
    password: string;
    confirm_password: string;
    constructor() { }

    isValid() {
        return !!this.username && this.password === this.confirm_password;
    }
}