import { Review, ReviewStates } from '../../Domain'
import { UpdateReviewResponse } from './UpdateReviewResponse'
import { InMemoryReviewRepository } from '../../Infraestructure/InMemoryReviewRepository'
import { UpdateReviewCommand } from './UpdateReviewCommand'
import { LoggerService } from '../../../Infrastructure/Persistence/Logger'
import { EventDispatcher } from '../../../Core/EventDispatcher'
import { UPDATE_REVIEW } from '../../../Core/Commit'

export class UpdateReviewService {
  constructor (private reviewRepository: InMemoryReviewRepository,
               private logger: LoggerService,
               private eventDispatcher: EventDispatcher) {
  }

  perform (updateReviewCommand: UpdateReviewCommand): UpdateReviewResponse {
    const review: Review = this.reviewRepository.find(updateReviewCommand.getReview()) as Review
    let message = ''
    const response = new UpdateReviewResponse()
    if (typeof review !== 'undefined') {
      message = (review.getState() === ReviewStates.IN_PROGRESS) ? 'update review' : 'review in progress'
    } else {
      message = 'review not found'
      response.setCode(404)
    }
    response.setMessage(message)
    this.logger.info(`${message}`)
    this.eventDispatcher.dispatch(UPDATE_REVIEW)
    return response
  }
}
