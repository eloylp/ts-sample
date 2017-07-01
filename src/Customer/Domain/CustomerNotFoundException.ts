export class CustomerNotFoundException extends Error {
  constructor (...args: Array<any>) {
    super(...args);
  }

  static fromCustomer (customer: string) {
    return new CustomerNotFoundException(`Customer ${customer} not found !!`);
  }
}