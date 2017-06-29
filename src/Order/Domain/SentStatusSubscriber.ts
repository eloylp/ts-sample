

import {Status} from "./Status";
export class SentStatusSubscriber implements Subscriber {
    handle(order: Order): void {
        console.log("Order has been sent. A new email was sent (" + order.customer.email + ") to our customer " + order.customer.name + ". we expect some feedback !!");
        console.log("Items sent: " + order.items.join(', '));

    }

    isSubscribedTo(order: Order): boolean {
        return order.status == Status.sent;
    }
}

