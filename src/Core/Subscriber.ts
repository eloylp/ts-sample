export interface Subscriber {

  handle (element: any): void
  isSubscribedTo (element: any): boolean
}
