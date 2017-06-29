import {Uuid} from "./Uuid";
import {Status} from "./Status";
import {Customer} from "../../Customer/Domain/Customer";

export class Order {



    private _orderNo: Uuid;
    private _customer: Customer;
    private _status: string;
    private _items: Array<string>;

    constructor(uuid: Uuid, customer: Customer, items: Array<string>, status: string = Status.requested) {

        this._orderNo = uuid;
        this._customer = customer;
        this.items = items;
        this.status = status;

    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get items(): Array<string> {
        return this._items;
    }

    set items(value: Array<string>) {
        this._items = value;
    }

    addItem(itemId: string) {
        this._items.push(itemId);
    }

    get customer(): Customer {
        return this._customer;
    }
    get orderNo(): Uuid {
        return this._orderNo;
    }

}