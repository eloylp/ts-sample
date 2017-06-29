

import {Customer} from "./Customer";

export interface CustomerRepository {

    save(order: Customer): void;

    getByEmail(email: string): Customer | null;

}