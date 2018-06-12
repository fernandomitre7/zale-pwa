import { ApiObject } from '../api.service';

export class Establishment implements ApiObject {

    id?: string;
    type: string;
    display_name: string;
    search_name: string;
    description: string;

    constructor() { }

    isValid(): boolean {
        return true;
    }

}
