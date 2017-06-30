import {OrderRepository} from "../Domain/OrderRepository";
import {Order} from "../Domain/Order";

export class InMemoryOrderRepository implements OrderRepository {


    private _store: Array<Order>;

    constructor() {
        this._store = [];
    }

    update(order: Order): void {
        for (let i = 0, l = this._store.length; i < l; i++) {
            if (this._store[i].orderNo.uuid == order.orderNo.uuid) {
                this._store.splice(i, 1);
                this._store.push(order);
            }
        }
    }

    save(order: Order): void {
        this._store.push(order);
    }

    getByUid(uid: string): Order | null {
        for (let order of this._store) {
            if (order.orderNo.uuid == uid) {
                return order;
            }
        }
        return null;
    }
}