export class AddOrderCommand {
  constructor (private _customer: string, private _items: Array<string>) {
  }

  get items (): Array<string> {
    return this._items
  }

  get customer (): string {
    return this._customer
  }
}