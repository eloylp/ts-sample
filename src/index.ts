

/*
 Creating context
 */

import {StatusPublisher} from "./Order/Domain/StatusPublisher";
import {RequestedStatusSubscriber} from "./Order/Domain/RequestedStatusSubscriber";
import {InProgressStatusSubscriber} from "./Order/Domain/InProgressStatusSubscriber";
import {SentStatusSubscriber} from "./Order/Domain/SentStatusSubscriber";
import {Customer} from "./Customer/Domain/Customer";
import {Order} from "./Order/Domain/Order";
import {Uuid} from "./Order/Domain/Uuid";
import {Status} from "./Order/Domain/Status";

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