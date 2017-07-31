import * as express from 'express'
import { Router } from 'express'
import { ReviewController } from './ReviewController'

export class ReviewRoutes {
  private static basePat: string = '/review'

  constructor (private controller = new ReviewController(),
               private router: Router = express.Router()) {
  }

  static getUpdateRoute (): string {
    return `${ReviewRoutes.basePat}/update`
  }

  getRoutes (): Router {
    this.router.use(ReviewRoutes.getUpdateRoute(), this.controller.update)
    return this.router
  }
}
