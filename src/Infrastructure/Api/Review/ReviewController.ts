import * as express from 'express'
import { InMemoryReviewRepository } from '../../../Review/Infraestructure/InMemoryReviewRepository'
import { UpdateReviewService } from '../../../Review/Application/UpdateReview/UpdateReviewService'
import { UpdateReviewResponse } from '../../../Review/Application/UpdateReview/UpdateReviewResponse'
import { UpdateReviewCommand } from '../../../Review/Application/UpdateReview/UpdateReviewCommand'
import { LoggerService } from '../../Persistence/Logger'
import eventDispatcher from '../../../Core/EventDispatcher'

export class ReviewController {
  update (req: express.Request, res: express.Response): void {
    const reviewId: string = req.params.id
    const result: UpdateReviewResponse = new UpdateReviewService(
      new InMemoryReviewRepository(),
      new LoggerService(),
      eventDispatcher
    ).perform(new UpdateReviewCommand(reviewId))
    res.status(result.getStatusCode()).json(result.toJSON())
  }
}
