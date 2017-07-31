export class UpdateReviewCommand {
  constructor (private reviewId: string) {
  }

  getReview (): string {
    return this.reviewId
  }
}
