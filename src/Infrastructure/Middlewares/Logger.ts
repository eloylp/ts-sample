import { Request, Response, RequestHandler } from 'express'
import { LoggerService } from '../Persistence/Logger'
export class Logger {
  constructor (private loggerService: LoggerService) {}

  loggerRequest (): RequestHandler {
    return (req: Request, res: Response, next: Function) => {

      const requestData = `Request ${req.url} - method: ${req.method}`
      this.loggerService.info(requestData)
      const hasBody = req.body && Object.keys(req.body).length > 0
      if (hasBody) {
        const bodyData = `Body: ${JSON.stringify(req.body)}`
        this.loggerService.info(bodyData)
      }
      next()
    }
  }
}
