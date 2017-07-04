import { Order } from './Order'
import { Status } from './Status'
import { Subscriber } from '../../Core/Subscriber'

export class InProgressStatusSubscriber implements Subscriber {
  handle ({ customer }: Order): void {
    const { email, name } = customer
    const message = `A new email was sent (${email}) to our customer ${name}. we are working on it !`
    console.log(message)
  }

  isSubscribedTo ({ status }: Order): boolean {
    return status === Status.inProgress
  }
}

