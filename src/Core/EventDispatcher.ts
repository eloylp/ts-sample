import { EventEmitter } from 'events'
import { Commit, EventTypes } from './Commit'

export class EventDispatcher extends EventEmitter {
  constructor (private commits: Array<Commit> = []) {
    super()
  }

  subscribe (commit: Commit): void {
    this.commits.push(commit)
  }

  dispatch (eventType: EventTypes, ...args: Array<any>): void {
    for (const commit of this.commits) {
      if (commit.getType() === eventType) {
        commit.execute(args)
      }
    }
  }

  addEventToBusDispatcher (eventType: EventTypes, handler: (args: any) => void) {
    this.on(eventType, handler)
  }

  emitFromBusDispatcher (eventType: EventTypes, data: any) {
    this.emit(eventType, data)
  }
}
// cached instance
export default new EventDispatcher()