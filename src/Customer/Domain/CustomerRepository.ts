import { Customer } from './Customer';

export interface CustomerRepository {

  save(order: Customer): void;

  update(customer: Customer): void;

  getByEmail(email: string): Customer | void;

}