import { expect } from 'chai'

import { Status } from '../src/Order/Domain/Status'
import { StatusValue } from '../src/Order/Domain/StatusValue'

describe('Status class', () => {
  it('should return a valid status values', () => {
    const result: Array<StatusValue> = Status.getStatuses()
    expect(result).to.be.lengthOf(3)
  })

  it('should return values', () => {
    expect(Status.getStatuses()).to.be.eql([
      'requested',
      'inProgress',
      'sent'
    ])
  })
})
