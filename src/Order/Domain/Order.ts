import { Uuid } from './Uuid'
import { Status } from './Status'
import { Customer } from '../../Customer/Domain/Customer'
import { StatusValue } from './StatusValue'

export class Order {

  constructor (private _orderNo: Uuid,
               private _customer: Customer,
               private _items: Array<string>,
               private _status: StatusValue = Status.requested) {
  }

  get status (): StatusValue {
    return this._status
  }

  set status (value: StatusValue) {
    this._status = value
  }

  get items (): Array<string> {
    return this._items
  }

  set items (value: Array<string>) {
    this._items = value
  }

  addItem (itemId: string) {
    this._items.push(itemId)
  }

  get customer (): Customer {
    return this._customer
  }

  get orderNo (): Uuid {
    return this._orderNo
  }

}