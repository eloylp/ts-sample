import { json, urlencoded } from 'body-parser'

export class BodyParser {
  static getMethods () {
    return [
      urlencoded({
        extended: true
      }),
      json()
    ]
  }
}