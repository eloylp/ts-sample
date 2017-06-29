import {OrderRepository} from "../Domain/OrderRepository";
import {Order} from "../Domain/Order";

export class InMemoryOrderRepository implements OrderRepository {

    private store: Array<Order>;

    constructor() {
        this.store = [];
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