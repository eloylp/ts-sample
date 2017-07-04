import {Logger, transports, LoggerInstance} from 'winston'

export class LoggerService {
  private executor: LoggerInstance
  static getErrorLoggerConfiguration () {
    return {
      name: 'error-file',
      filename: 'logs/filelog-error.log',
      level: 'error'
    }
  }

  static getInfoLoggerConfiguration () {
    return {
      name: 'info-file',
      filename: 'logs/filelog-info.log',
      level: 'info'
    }
  }

  constructor () {
    this.executor = new (Logger)({
      transports: [
        new (transports.Console)(),
        new (transports.File)(LoggerService.getInfoLoggerConfiguration()),
        new (transports.File)(LoggerService.getErrorLoggerConfiguration())
      ]
    })
  }

  info (message: string) {
    this.executor.info(message)
  }

  error (message: string) {
    this.executor.error(message)
  }
}

export default new Logger()
