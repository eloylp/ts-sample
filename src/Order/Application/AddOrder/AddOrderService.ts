import { OrderRepository } from '../../Domain/OrderRepository'
import { Publisher } from '../../../Core/Publisher'
import { AddOrderCommand } from './AddOrderCommand'
import { Order } from '../../Domain/Order'
import { Uuid } from '../../Domain/Uuid'
import { CustomerRepository } from '../../../Customer/Domain/CustomerRepository'
import { CustomerNotFoundException } from '../../../Customer/Domain/CustomerNotFoundException'

export class AddOrderService {
  constructor (private orderRepository: OrderRepository,
               private customerRepository: CustomerRepository,
               private statusPublisher: Publisher) {
  }

  public perform ({ customer, items }: AddOrderCommand): string {

    const customerFound = this.customerRepository.getByEmail(customer)

    if (!customerFound) {
      throw CustomerNotFoundException.fromCustomer(customer)
    }

    const orderUid = new Uuid()
    const order = new Order(orderUid, customerFound, items)

    this.orderRepository.save(order)
    this.statusPublisher.publish(order)

    return orderUid.uuid
  }
}
