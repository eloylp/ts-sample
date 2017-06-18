interface Publisher {

    subscribe(subscriber: Subscriber): void;
    publish(element: any): void;

}

interface Subscriber {

    handle(element: any): void;
    isSubscribedTo(element: any): boolean;
}


class StatusPublisher implements Publisher {

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

class RequestedStatusSubscriber implements Subscriber {
    handle(order: Order): void {
        console.log("A new order has been requested !!! Our customer " + order.customer.name + " is waiting for this order !");
    }

    isSubscribedTo(order: Order): boolean {
        return order.status == Status.requested;
    }
}


class InProgressStatusSubscriber implements Subscriber {
    handle(order: Order): void {
        console.log("A new email was sent (" + order.customer.email + ") to our customer " + order.customer.name + ". we are working on it !");
    }

    isSubscribedTo(order: Order): boolean {
        return order.status == Status.inProgress;
    }
}

class SentStatusSubscriber implements Subscriber {
    handle(order: Order): void {
        console.log("Order has been sent. A new email was sent (" + order.customer.email + ") to our customer " + order.customer.name + ". we expect some feedback !!");
        console.log("Items sent: " + order.items.join(', '));

    }

    isSubscribedTo(order: Order): boolean {
        return order.status == Status.sent;
    }
}


class Uuid {

    private _uuid: string;

    constructor() {

        this.uuid = this.calcUuid();
    }

    private calcUuid() {
        return this.uuid = Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }
}


class Customer {

    private _name: string;
    private _email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}


class Status {
    static readonly requested = "requested";
    static readonly inProgress = "inProgress";
    static readonly sent = "sent";
}

class Order {


    private orderNo: Uuid;
    private _customer: Customer;
    private _status: string;
    private _items: Array<string>;

    constructor(uuid: Uuid, customer: Customer, items: Array<string>, status: string = Status.requested) {

        this.orderNo = uuid;
        this._customer = customer;
        this.items = items;
        this.status = status;

    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get items(): Array<string> {
        return this._items;
    }

    set items(value: Array<string>) {
        this._items = value;
    }

    addItem(itemId: string) {
        this._items.push(itemId);
    }

    get customer(): Customer {
        return this._customer;
    }

}

/*
 Creating context
 */

let statusPublisher = new StatusPublisher();
statusPublisher.subscribe(new RequestedStatusSubscriber());
statusPublisher.subscribe(new InProgressStatusSubscriber());
statusPublisher.subscribe(new SentStatusSubscriber());

const getRandomFromArray = function (myArray: Array<any>): any {
    return myArray[Math.floor(Math.random() * myArray.length)];
};

let availableItems: Array<string> = [
    'car', 'snorkel', 'book', 'computer', 'desk'
];

let availableCustomers: Array<any> = [

    {"name": "Pepe", "email": "pepe@mailserver.com"},
    {"name": "Juan", "email": "juan@mailserver.com"},
    {"name": "Maria", "email": "maria@mailserver.com"},
    {"name": "Luisa", "email": "luisa@mailserver.com"}
];

let customers: Array<Customer> = [];
let orders: Array<Order> = [];

new Promise(function (resolve) {

    console.log("Creating customers ...");

    for (let customer of availableCustomers) {
        customers.push(new Customer(customer.name, customer.email));
    }
    console.log(customers);

    resolve();

}).then(function () {

    console.log("Creating orders ...");
    for (let i: number = 0, l: number = 10; i < l; i++) {

        orders.push(new Order(
            new Uuid(),
            getRandomFromArray(customers),
            [getRandomFromArray(availableItems), getRandomFromArray(availableItems)]
        ));
    }
    console.log(orders);


}).then(function () {

    console.log("___________ PUBLISHING ORDERS STATUS ___________");

    for (let order of orders) {
        statusPublisher.publish(order);
    }

}).then(function () {

    console.log("___________ CHANGING/PUBLISHING ORDERS STATUS ___________");

    for (let order of orders) {
        order.status = Status.inProgress;
        statusPublisher.publish(order);
    }

}).then(function () {

    console.log("___________ CHANGING/PUBLISHING ORDERS STATUS ___________");

    for (let order of orders) {
        order.status = Status.sent;
        statusPublisher.publish(order);
    }

});