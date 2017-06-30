
export class Status {
    static readonly requested = "requested";
    static readonly inProgress = "inProgress";
    static readonly sent = "sent";

    public static getStatuses(): Array<string> {

        return [
            this.requested,
            this.inProgress,
            this.sent
        ];
    }
}
