import { OrderRepository } from '../Domain/OrderRepository'
import { Order } from '../Domain/Order'

export class InMemoryOrderRepository implements OrderRepository {


  private order: Array<Order> = []

  constructor () {
  }

  update (order: Order): void {
    const index = this.order.findIndex((o: Order) => o.orderNo.uuid === order.orderNo.uuid)
    if (index !== -1) {
      this.order.splice(index, 1, order)
    }
  }

  save (order: Order): void {
    this.order.push(order)
  }

  getByUid (uid: string): Order | void {
    return this.order.find((order: Order) => order.orderNo.uuid === uid)
  }
}