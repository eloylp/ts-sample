import {OrderRepository} from "../Domain/OrderRepository";
import {Order} from "../Domain/Order";

export class InMemoryOrderRepository implements OrderRepository {


    private store: Array<Order>;

    constructor() {
        this.store = [];
    }

    update(order: Order): void {
        for (let savedOrder in this.store) {
            if (this.store[savedOrder].orderNo.uuid == order.orderNo.uuid) {
                delete this.store[savedOrder];
                this.store.push(order);
            }
        }
    }

    save(order: Order): void {
        this.store.push(order);
    }

    getByUid(uid: string): Order | null {

        for(let order of this.store){
            if(order.orderNo.uuid == uid){
                return order;
            }
        }
        return null;
    }
}