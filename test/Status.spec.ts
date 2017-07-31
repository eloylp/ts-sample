import { should } from 'chai'
import 'mocha'

import { Status } from '../src/Order/Domain/Status'
import { StatusValue } from '../src/Order/Domain/StatusValue'

should()

describe('Status class', () => {
  it('should return a valid status values', () => {
    const result: Array<StatusValue> = Status.getStatuses()
    result.should.be.lengthOf(3)
  })
})
