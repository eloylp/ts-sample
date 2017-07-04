import * as express from 'express'
import {Express, Router, Request, Response} from 'express'
import {ReviewRoutes} from './Api/Review/ReviewRoutes'
import { Connect } from './Middlewares/Connect'

class App {
  public express: Express

  constructor (private router: Router = express.Router()) {
    this.express = express()
    this.mountMiddlewares()
    this.mountRoutes()
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

  private mountMiddlewares () {
    this.express.use(new Connect().config())
  }
}

export default new App().express
