

import {Status} from "./Status";
export class RequestedStatusSubscriber implements Subscriber {
    handle(order: Order): void {
        console.log("A new order has been requested !!! Our customer " + order.customer.name + " is waiting for this order !");
    }

    isSubscribedTo(order: Order): boolean {
        return order.status == Status.requested;
    }
}
