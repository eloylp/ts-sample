import { Subscriber } from './Subscriber';
export interface Publisher {
  subscribe(subscriber: Subscriber): void;
  publish(element: any): void;
}
