import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Order } from '../shared/order';

@Injectable()
export class OrderService {
  private basePath: '/orders'; // => declare a path for nosql db

  orders: FirebaseListObservable<Order[]> = null; // List of orders
  order: FirebaseObjectObservable<Order> = null; // Single orders

  constructor(private db: AngularFireDatabase) {
  }

  // => Get a list of orders using API
   // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getOrdersList(query= {}): FirebaseListObservable<Order[]> { 
    this.orders = this.db.list('/orders', {
      query: query
    });
    return this.orders;
  }
// => Get a single, observable order
  getOrder(key: string): FirebaseObjectObservable<Order> { 
    const orderPath = `${this.basePath}/${key}`;
    this.order = this.db.object(orderPath);
    return this.order;
  }
  
  // => Create a new order . void operates on items variable or takes a specific key as component
  createOrder(order: Order): void {   
    this.orders.push(order)
    .catch(error => this.handleError(error));
  }
  // => Update an existing order
  updateOrder(key: string, value: any): void {
    this.orders.update(key, value)
    .catch(error => this.handleError(error));
  }
  // // UPDATE FROM MESSAGING APP 
  // updateItem(key: string, newText: string) {
  //   this.orders.update(key, { text: newText });
  // }

  // => Delete a single order
  deleteOrder(key: string): void {
    this.orders.remove(key)
    .catch(error => this.handleError(error));
  }
// DELETE ALL
 // => Delete an entire list of orders
  deleteEverything(): void {
    this.orders.remove()
    .catch(error => this.handleError(error));
  }

  // => Default error handler
  private handleError(error) {
    console.log(error);
  }

}
