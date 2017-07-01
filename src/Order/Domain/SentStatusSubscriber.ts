import { Status } from './Status';
import { Subscriber } from '../../Core/Subscriber';
import { Order } from './Order';

export class SentStatusSubscriber implements Subscriber {
  handle ({ customer, items }: Order): void {
    const { email, name } = customer;
    console.log(`Order has been sent. A new email was sent (${email}) to our customer ${name}. we expect some feedback !!`);
    console.log(`Items sent: ${items.join(', ')}`);
  }

  isSubscribedTo ({ status }: Order): boolean {
    return status === Status.sent;
  }
}

