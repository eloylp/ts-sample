export class UpdateOrderCommand {

    private _uuid: string;
    private _status: string;

    constructor(uuid: string, status: string) {

        this._uuid = uuid;
        this._status = status;
    }

    get status(): string {
        return this._status;
    }

    get uuid(): string {
        return this._uuid;
    }

}