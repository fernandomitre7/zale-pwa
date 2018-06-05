const GRANT_TYPE_PASSWORD = 'password';
const USER_TYPE_CLIENT = 'client'; // retailer, business, "establecimiento" ,etc, TODO: DEFINE THEM
export class UserAuth {

    constructor(public username?: string, public password?: string, remember?: boolean) {
        this.grant_type = GRANT_TYPE_PASSWORD;
        this.user_type = USER_TYPE_CLIENT;
        if (remember !== undefined) {
            this.remember = remember;
        } else {
            this.remember = true;
        }
    }

    grant_type: string;
    user_type: string;
    remember: boolean;

    isValid(): boolean {
        return !!this.username && !!this.password;
    }
}
