import { Commit, UPDATE_REVIEW } from '../../Core/Commit'
import { LoggerService } from '../../Infrastructure/Persistence/Logger'
export class UpdateReviewCommit extends Commit {
  constructor (private loggerService: LoggerService) {
    super(UPDATE_REVIEW)
  }
  execute () {
    this.loggerService.info(`Dispatching ${this.getType()}: Update review commit`)
  }
}
