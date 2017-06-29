
export class Uuid {

    private _uuid: string;

    constructor() {

        this.uuid = this.calcUuid();
    }

    private calcUuid() {
        return this.uuid = Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    set uuid(value: string) {
        this._uuid = value;
    }
}
