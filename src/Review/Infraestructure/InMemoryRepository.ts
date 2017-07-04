import {Repository} from './Repository'
export class InMemoryRepository<Entity extends Repository> {
  constructor (protected reviews: Array<Entity> = []) {}

  update (review: Entity): void {
    const index = this.reviews.findIndex((r: Entity) => r.id === review.id)
    if (index !== -1) {
      this.reviews.splice(index, 1, review)
    }
  }

  find (reviewId: string): Entity | void {
    return this.reviews.find((r: Entity) => r.id === reviewId)
  }
}
