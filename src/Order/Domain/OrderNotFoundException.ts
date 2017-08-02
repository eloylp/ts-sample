export class OrderNotFoundException extends Error {
  static fromUuid (uuid: string) {
    return new OrderNotFoundException(`Order ${uuid} not found !!`)
  }
}
