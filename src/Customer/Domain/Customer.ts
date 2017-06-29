

export class Customer {

    private _name: string;
    private _email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
