import * as express from 'express'
import { Express, Router, Request, Response } from 'express'
import { ReviewRoutes } from './Api/Review/ReviewRoutes'
import { Connect } from './Middlewares/Connect'
import eventDispatcher from '../Core/EventDispatcher'
import { UpdateReviewCommit } from '../Review/Domain/UpdateReviewCommit'
import { LoggerService } from './Persistence/Logger'

class App {
  public express: Express

  constructor (private router: Router = express.Router()) {
    this.express = express()
    this.mountMiddlewares()
    this.mountRoutes()
    this.addGlobalSubscribers()
  }

  private mountRoutes (): void {
    this.router.get('/ping', (req: Request, res: Response) => {
      res.json({
        message: 'pong!'
      })
    })
    this.express.use(this.router)
    this.express.use(new ReviewRoutes().getRoutes())
  }

  private mountMiddlewares (): void {
    this.express.use(new Connect().config())
  }

  private addGlobalSubscribers (): void {
    eventDispatcher.subscribe(new UpdateReviewCommit(new LoggerService()))
  }
}

export default new App().express
