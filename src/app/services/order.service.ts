import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Order } from '../shared/order';
import { Http, Response, Headers } from '@angular/http';
import * as guessCarrier from 'guess-carrier'

@Injectable()
export class OrderService {
  private basePath: '/orders'; // => declare a path for nosql db

  orders: FirebaseListObservable<Order[]> = null; // List of orders
  order: FirebaseObjectObservable<Order> = null; // Single orders

  constructor(private db: AngularFireDatabase, private http: Http) {

  }

  //create authorization for headers
  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'ShippoToken shippo_live_f6263ed293b9383dd58aaff78ca2ce1626e77645'); 
  }  

  // => Get a list of orders using API
  getData(trackingNumber) {
    var carrier = guessCarrier(trackingNumber)[0];
    var headers = new Headers();
    this.createAuthorizationHeader(headers);

    var content = JSON.stringify({
      carrier: carrier,
      tracking_number: trackingNumber
    })

    headers.append('Content-Type', 'application/json');
    return this.http.post('https://api.goshippo.com/tracks/', content, {
      headers: headers
    })
    .subscribe(res => {
      var data = res.json();
      this.orders.push({
        carrier: data.carrier,
        status: data.tracking_status.status,
        location: data.tracking_status.location.city, 
      })
    })
  }
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
