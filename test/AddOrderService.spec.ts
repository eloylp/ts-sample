import { expect, should } from 'chai';
import { stub, restore } from 'sinon';
import { AddOrderService } from '../src/Order/Application/AddOrder/AddOrderService';
import { OrderRepository } from '../src/Order/Domain/OrderRepository';
import { InMemoryOrderRepository } from '../src/Order/Infrastructure/InMemoryOrderRepository';
import { CustomerRepository } from '../src/Customer/Domain/CustomerRepository';
import { InMemoryCustomerRepository } from '../src/Customer/Infrastructure/InMemoryCustomerRepository';
import { StatusPublisher } from '../src/Order/Domain/StatusPublisher';
import { AddOrderCommand } from '../src/Order/Application/AddOrder/AddOrderCommand';
import { CustomerNotFoundException } from '../src/Customer/Domain/CustomerNotFoundException';


should();

describe('AddOrderService', () => {
  let service: AddOrderService;
  let orderRepository: OrderRepository;
  let customerRepository: CustomerRepository;
  let statusPublisher: StatusPublisher;

  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    customerRepository = new InMemoryCustomerRepository();
    statusPublisher = new StatusPublisher();
    service = new AddOrderService(orderRepository, customerRepository, statusPublisher);
  });

  it('should return a valid uuid', () => {
    service = new AddOrderService(orderRepository, customerRepository, statusPublisher);
    stub(orderRepository, 'save');
    stub(customerRepository, 'getByEmail').returns({});
    stub(statusPublisher, 'publish');

    const uuid = service.perform(getMockAddOrderCommand());
    uuid.should.be.an('string');

    restore(orderRepository.save);
    restore(statusPublisher.publish);
    restore(orderRepository.getByUid);
  });
  it('should return an CustomerNotFoundException', () => {
    service = new AddOrderService(orderRepository, customerRepository, statusPublisher);
    stub(customerRepository, 'getByEmail').returns(undefined);
    expect(() => {
      service.perform(getMockAddOrderCommand());
    }).to.throw(CustomerNotFoundException, 'Customer customerEmail not found !!');
  });

  const getMockAddOrderCommand = (): AddOrderCommand => {
    return <AddOrderCommand>{ customer: 'customerEmail', items: ['car', 'snorkel'] };
  };
});
