export class UpdateReviewResponse {
  constructor (private message: string = '', private code: number = 200) {
  }

  setMessage (message: string) {
    this.message = message
  }

  setCode (code: number) {
    this.code = code
  }

  getStatusCode (): number {
    return this.code
  }

  toJSON () {
    return {
      message: this.message
    }
  }
}
