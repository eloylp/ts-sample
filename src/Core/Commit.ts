import { EventEmitter } from 'events'
export type EventTypes = 'UPDATE_REVIEW'
export const UPDATE_REVIEW: EventTypes = 'UPDATE_REVIEW'
interface CommitInterface {
  execute: (args: Array<any>) => any
}

class CommitException extends Error {}

export class Commit implements CommitInterface {
  constructor (private type: EventTypes) {}

  execute (args: Array<any>): any {
    throw new CommitException('Incorrectly implements interface')
  }

  getType (): EventTypes {
    return this.type
  }
}