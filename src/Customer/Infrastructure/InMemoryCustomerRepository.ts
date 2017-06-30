import {Customer} from "../Domain/Customer";
import {CustomerRepository} from "../Domain/CustomerRepository";

export class InMemoryCustomerRepository implements CustomerRepository {

    private _store: Array<Customer>;

    constructor() {
        this._store = [];
    }

    save(order: Customer): void {
        this._store.push(order);
    }

    update(customer: Customer): void {
        for (let i = 0, l = this._store.length; i < l; i++) {
            if (this._store[i].email == customer.email) {
                this._store.splice(i, 1);
                this._store.push(customer);
            }
        }
    }

    getByEmail(email: string): Customer | null {

        for (let customer of this._store) {
            if(customer.email == email){
                return customer;
            }
        }
        return null;
    }
}