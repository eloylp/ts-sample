import {OrderRepository} from "../../Domain/OrderRepository";
import {Publisher} from "../../../Core/Publisher";
import {UpdateOrderCommand} from "./UpdateOrderCommand";
import {Status} from "../../Domain/Status";

export class UpdateOrderService {

    private orderRepository: OrderRepository;
    private statusPublisher: Publisher;

    constructor(orderRepository: OrderRepository, statusPublisher: Publisher) {

        this.orderRepository = orderRepository;
        this.statusPublisher = statusPublisher;
    }

    public perform(command: UpdateOrderCommand): boolean {

        if (Status.getStatuses().indexOf(command.status) == -1) {
            throw new Error("Status not found !!");
        }
        let order = this.orderRepository.getByUid(command.uuid);
        if (!order) {
            throw new Error("Order not found !!");
        }
        order.status = command.status;

        this.orderRepository.update(order);
        this.statusPublisher.publish(order);

        return true
    }
}