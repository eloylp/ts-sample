import * as express from 'express'
import {Router} from 'express'
import { BodyParser } from './BodyParser'
import { Logger } from './Logger'
import { LoggerService } from '../Persistence/Logger'

export class Connect {
  constructor (private router: Router = express.Router()) {}

  config (): Router {
    const logger: Logger = new Logger(new LoggerService())
    BodyParser.getMethods().forEach(method => this.router.use(method))
    this.router.use(logger.loggerRequest())
    return this.router
  }
}
