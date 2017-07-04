import { StatusValue } from './StatusValue'
export class Status {
  static readonly requested: StatusValue = StatusValue.Requested
  static readonly inProgress: StatusValue = StatusValue.InProgress
  static readonly sent: StatusValue = StatusValue.Sent

  public static getStatuses (): Array<StatusValue> {

    return [
      this.requested,
      this.inProgress,
      this.sent
    ]
  }
}
