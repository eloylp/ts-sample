export class AddOrderCommand {

    private _customer: string;
    private _items: Array<string>;

    constructor(customer: string, items: Array<string>) {
        this._customer = customer;
        this._items = items;
    }

    get items(): Array<string> {
        return this._items;
    }

    get customer(): string {
        return this._customer;
    }
}