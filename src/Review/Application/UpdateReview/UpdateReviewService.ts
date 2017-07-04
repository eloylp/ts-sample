import { Review, ReviewStates } from '../../Domain'
import { UpdateReviewResponse } from './UpdateReviewResponse'
import { InMemoryReviewRepository } from '../../Infraestructure/InMemoryReviewRepository'
import { UpdateReviewCommand } from './UpdateReviewCommand'
import { LoggerService } from '../../../Infrastructure/Persistence/Logger'

export class UpdateReviewService {
  constructor (private updateReviewResponse: UpdateReviewResponse,
               private reviewRepository: InMemoryReviewRepository,
               private logger: LoggerService
               /*TODO inject eventDispatcher o el publisher*/) {
  }

  perform (updateReviewCommand: UpdateReviewCommand): UpdateReviewResponse {
    const review: Review = <Review>this.reviewRepository.find(updateReviewCommand.getReview())
    let message = ''
    if (typeof review !== 'undefined') {
      message = (review.getState() === ReviewStates.IN_PROGRESS) ? 'update review' : 'review in progress'
    } else {
      message = 'review not found'
      this.updateReviewResponse.setCode(404)
    }
    this.updateReviewResponse.setMessage(message)
    this.logger.info(`${message}`)
    return this.updateReviewResponse
  }
}