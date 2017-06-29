import {Customer} from "../Domain/Customer";
import {CustomerRepository} from "../Domain/CustomerRepository";

export class InMemoryCustomerRepository implements CustomerRepository {

    private store: Array<Customer>;

    constructor() {
        this.store = [];
    }

    save(order: Customer): void {
        this.store.push(order);
    }

    getByEmail(email: string): Customer | null {

        for(let customer of this.store){
            if(customer.email == email){
                return customer;
            }
        }
        return null;
    }
}