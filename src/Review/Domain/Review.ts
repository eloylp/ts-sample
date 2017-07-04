import { ReviewStates } from './ReviewStates'
export class Review {
  id: string
  state: ReviewStates

  getState (): ReviewStates {
    return this.state
  }
}
