import { Customer } from '../Domain/Customer'
import { CustomerRepository } from '../Domain/CustomerRepository'

export class InMemoryCustomerRepository implements CustomerRepository {

  private store: Array<Customer> = []

  save (order: Customer): void {
    this.store.push(order)
  }

  update (customer: Customer): void {
    const index = this.store.findIndex((c: Customer) => c.email === customer.email)
    if (index !== -1) {
      this.store.splice(index, 1, customer)
    }
  }

  getByEmail (email: string): Customer | void {
    return this.store.find((customer: Customer) => customer.email === email)
  }
}
