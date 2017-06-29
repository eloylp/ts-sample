
import {Publisher} from "../../Core/Publisher";
import {Subscriber} from "../../Core/Subscriber";
import {Order} from "./Order";

export class StatusPublisher implements Publisher {

    private subscribers: Array<Subscriber> = [];

    subscribe(subscriber: Subscriber): void {

        this.subscribers.push(subscriber);
    }

    publish(order: Order): void {

        for (let subscriber of this.subscribers) {
            if (subscriber.isSubscribedTo(order)) {
                subscriber.handle(order);
            }
        }
    }
}
