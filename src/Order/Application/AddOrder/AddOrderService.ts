import {OrderRepository} from "../../Domain/OrderRepository";
import {Publisher} from "../../../Core/Publisher";
import {AddOrderCommand} from "./AddOrderCommand";
import {Order} from "../../Domain/Order";
import {Uuid} from "../../Domain/Uuid";
import {CustomerRepository} from "../../../Customer/Domain/CustomerRepository";

export class AddOrderService {

    private orderRepository: OrderRepository;
    private customerRepository: CustomerRepository;
    private statusPublisher: Publisher;

    constructor(orderRepository: OrderRepository, customerRepository: CustomerRepository, statusPublisher: Publisher) {

        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.statusPublisher = statusPublisher;
    }

    public perform(command: AddOrderCommand): string {


        let customer = this.customerRepository.getByEmail(command.customer);

        if (!customer) {
            throw new Error("Customer not found !!");
        }

        let orderUid = new Uuid();
        let order = new Order(orderUid, customer, command.items);

        this.orderRepository.save(order);
        this.statusPublisher.publish(order);

        return orderUid.uuid;
    }
}