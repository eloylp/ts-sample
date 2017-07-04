import { Customer } from './Customer/Domain/Customer'
import { Status } from './Order/Domain/Status'
import { InMemoryOrderRepository } from './Order/Infrastructure/InMemoryOrderRepository'
import { RequestedStatusSubscriber } from './Order/Domain/RequestedStatusSubscriber'
import { SentStatusSubscriber } from './Order/Domain/SentStatusSubscriber'
import { InProgressStatusSubscriber } from './Order/Domain/InProgressStatusSubscriber'
import { StatusPublisher } from './Order/Domain/StatusPublisher'
import { AddOrderService } from './Order/Application/AddOrder/AddOrderService'
import { OrderRepository } from './Order/Domain/OrderRepository'
import { CustomerRepository } from './Customer/Domain/CustomerRepository'
import { InMemoryCustomerRepository } from './Customer/Infrastructure/InMemoryCustomerRepository'
import { UpdateOrderService } from './Order/Application/UpdateOrder/UpdateOrderService'
import { AddOrderCommand } from './Order/Application/AddOrder/AddOrderCommand'
import { UpdateOrderCommand } from './Order/Application/UpdateOrder/UpdateOrderCommand'


const getRandomFromArray = function (myArray: Array<any>): any {
  return myArray[Math.floor(Math.random() * myArray.length)]
}

/*
 Creating context
 */

const statusPublisher: StatusPublisher = new StatusPublisher()
const orderRepository: OrderRepository = new InMemoryOrderRepository()
const customerRepository: CustomerRepository = new InMemoryCustomerRepository()

statusPublisher.subscribe(new RequestedStatusSubscriber())
statusPublisher.subscribe(new InProgressStatusSubscriber())
statusPublisher.subscribe(new SentStatusSubscriber())

const addOrderService: AddOrderService = new AddOrderService(
  orderRepository,
  customerRepository,
  statusPublisher
)

const updateOrderService: UpdateOrderService = new UpdateOrderService(
  orderRepository,
  statusPublisher
)


const availableItems: Array<string> = [
  'car', 'snorkel', 'book', 'computer', 'desk'
]

const availableCustomers: Array<any> = [

  { 'name': 'Pepe', 'email': 'pepe@mailserver.com' },
  { 'name': 'Juan', 'email': 'juan@mailserver.com' },
  { 'name': 'Maria', 'email': 'maria@mailserver.com' },
  { 'name': 'Luisa', 'email': 'luisa@mailserver.com' }
]

const orders: Array<string> = []


console.log('Creating customers ...')
for (const { name, email } of availableCustomers) {
  customerRepository.save(new Customer(name, email))
}

console.log('Creating orders ...')
for (let i: number = 0, l: number = 10; i < l; i++) {

  const createdOrder = addOrderService.perform(new AddOrderCommand(
    getRandomFromArray(availableCustomers).email,
    [getRandomFromArray(availableItems), getRandomFromArray(availableItems)]
  ))
  orders.push(createdOrder)
}


console.log('___________ CHANGING/PUBLISHING ORDERS STATUS ___________')

for (const order of orders) {

  updateOrderService.perform(new UpdateOrderCommand(
    order,
    Status.inProgress
  ))
}


console.log('___________ CHANGING/PUBLISHING ORDERS STATUS ___________')

for (const order of orders) {
  updateOrderService.perform(new UpdateOrderCommand(
    order,
    Status.sent
  ))
}
