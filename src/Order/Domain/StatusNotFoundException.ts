export class StatusNotFoundException extends Error {
  static fromStatusValue (status: string) {
    return new StatusNotFoundException(`Status ${status} not found !!`)
  }
}