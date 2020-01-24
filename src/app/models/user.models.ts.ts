export class User {
    email: string;
    password: string;
    confirm: string;

    constructor(email?: string, password?: string, confirm?: string) {
        this.email = email;
        this.password = password;
    }

}
