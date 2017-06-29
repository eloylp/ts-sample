import {Order} from "./Order";
import {Status} from "./Status";
import {Subscriber} from "../../Core/Subscriber";

export class InProgressStatusSubscriber implements Subscriber {
    handle(order: Order): void {
        console.log("A new email was sent (" + order.customer.email + ") to our customer " + order.customer.name + ". we are working on it !");
    }

    isSubscribedTo(order: Order): boolean {
        return order.status == Status.inProgress;
    }
}

