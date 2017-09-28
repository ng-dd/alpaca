import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Order } from '../shared/order';
import { Http, Response, Headers } from '@angular/http';
import * as guessCarrier from 'guess-carrier'
import { UserService } from './user.service';

@Injectable()
export class OrderService {
  private basePath: '/users'; // => declare a path for nosql db

  orders: FirebaseListObservable<Order[]> = null; // List of orders
  order: FirebaseObjectObservable<Order> = null; // Single orders
  store: '' ;
  nickname: '';

  constructor(private db: AngularFireDatabase, private http: Http, private afAuth: AngularFireAuth, private userService: UserService) {
    this.orders = db.list('/users', {
      query: {
        orderByChild: 'timestamp'
      }
    })
  }

  //create authorization for headers
  createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'ShippoToken shippo_live_f6263ed293b9383dd58aaff78ca2ce1626e77645'); 
  }  


  createOrder(order: Order) {
    this.orders.update(order.key, order)
    .catch(error => this.handleError(error));
  }
  // => Get a list of orders using API
  getData(trackingNumber, carrier, nickname, store) {
    var headers = new Headers();
    this.createAuthorizationHeader(headers);
    var userid = this.afAuth.auth.currentUser.uid
    this.orders = this.db.list(`/users/${userid}/orders`)

    var content = JSON.stringify({
      carrier: carrier,
      tracking_number: trackingNumber
    })

    headers.append('Content-Type', 'application/json');
    return this.http.post('https://api.goshippo.com/tracks/', content, {
      headers: headers
    })
    .subscribe(res => {
      //change commit
      var data = res.json();
      console.log('THIS IS DATA -->', data);
      // this.order = db.list('')
      this.createOrder({
        // key: data.tracking_status.object_id,
        key: trackingNumber,
        ordername: nickname, // => jordan
        store: store, // => nordstrom
        trackingNumber: trackingNumber,
        serviceImg: null, //String
        service: carrier, // => fedex
        currentLocation: data.tracking_status.location.city, // => somewhere
        status: data.tracking_status.status, // => departed
        deliveryDate: null, // => date, evening/afternoon/moring;
        timeStamp: null, //Date = new Date();
        active: null //boolean = true;
      })
      
    })
  }

   // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getOrdersList(query= {}): FirebaseListObservable<Order[]> { 
    this.orders = this.db.list(`/users/${this.afAuth.auth.currentUser.uid}/orders`, {
      query: query
    });
    return this.orders;
  }
// => Get a single, observable order
  getOrder(order: string): FirebaseObjectObservable<Order> { 
    const orderPath = `/users/${this.afAuth.auth.currentUser.uid}/orders/${order}`;
    this.order = this.db.object(orderPath);
    return this.order;
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
