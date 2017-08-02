import { Status } from './Status'
import { Order } from './Order'
import { Subscriber } from '../../Core/Subscriber'

export class RequestedStatusSubscriber implements Subscriber {
  handle (order: Order): void {
    const message = `A new order has been requested !!! Our customer ${order.customer.name} is waiting for this order !`
    console.log(message)
  }

  isSubscribedTo (order: Order): boolean {
    return order.status === Status.requested
  }
}
