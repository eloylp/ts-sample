interface Publisher {

    subscribers: Array<Subscriber>;
    subscribe(subscriber: Subscriber): void;
    publish(element: any): void;

}

interface Subscriber {

    handle(element: any): void;
    isSubscribedTo(element: any): boolean;
}


class EventPublisher implements Publisher {

    subscribers: Array<Subscriber> = [];

    subscribe(subscriber: Subscriber): void {

        this.subscribers.push(subscriber);
    }

    publish(element: any): void {

        for (let subscriber of this.subscribers) {
            if (subscriber.isSubscribedTo(element)) {
                subscriber.handle(element);
            }
        }
    }
}
