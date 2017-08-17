import { expect } from 'chai'
import { AddOrderCommand } from '../src/Order/Application/AddOrder/AddOrderCommand'

describe('AddOrderCommand', () => {
  let command: AddOrderCommand
  let customer: string = '111'
  let items: Array<string> = []

  beforeEach(() => {
    command = new AddOrderCommand(customer, items)
  })

  it('should retrieve a empty list of items', () => {
    expect(command.items).to.be.an('array')
    expect(command.items).to.be.eql([])
    expect(command.items).to.be.lengthOf(0)
  })

  it('should retrieve a customer id', () => {
    console.log('********************')
    console.log(command)
    console.log('********************')
    expect(command.customer).to.be.an('string')
    expect(command.customer).to.be.equal('111')
  })
})
