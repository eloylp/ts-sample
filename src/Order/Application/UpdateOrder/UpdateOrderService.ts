import { OrderRepository } from '../../Domain/OrderRepository'
import { Publisher } from '../../../Core/Publisher'
import { UpdateOrderCommand } from './UpdateOrderCommand'
import { Status } from '../../Domain/Status'
import { StatusValue } from '../../Domain/StatusValue'
import { StatusNotFoundException } from '../../Domain/StatusNotFoundException'
import { OrderNotFoundException } from '../../Domain/OrderNotFoundException'

export class UpdateOrderService {

  constructor (private orderRepository: OrderRepository, private statusPublisher: Publisher) {
  }

  public perform ({ status, uuid }: UpdateOrderCommand): boolean {

    this.checkIfStatusExists(status)

    const order = this.orderRepository.getByUid(uuid)
    if (!order) {
      throw OrderNotFoundException.fromUuid(uuid)
    }
    order.status = status as StatusValue

    this.orderRepository.update(order)
    this.statusPublisher.publish(order)

    return true
  }

  private checkIfStatusExists (status: string) {
    const statusNotExists = (s: StatusValue) => s !== status
    if (Status.getStatuses().every(statusNotExists)) {
      throw StatusNotFoundException.fromStatusValue(status)
    }
  }
}
