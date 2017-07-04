export class UpdateOrderCommand {

  constructor (private _uuid: string,
               private _status: string) {
  }

  get status (): string {
    return this._status
  }

  get uuid (): string {
    return this._uuid
  }

}