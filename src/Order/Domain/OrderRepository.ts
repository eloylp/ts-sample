import { Order } from './Order'

export interface OrderRepository {

  save (order: Order): void

  update (order: Order): void

  getByUid (uid: string): Order | void

}
