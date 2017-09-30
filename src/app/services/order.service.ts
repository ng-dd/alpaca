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
    console.log(userid);
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
        key: trackingNumber,
        ordername: nickname, // => jordan
        store: store, // => nordstrom
        trackingNumber: trackingNumber,
        serviceImg: null, //String
        service: carrier, // => fedex
        currentLocation: data.tracking_status.location.city, // => somewhere
        status: data.tracking_status.status, // => departed
        deliveryDate: this.printDate(data.eta), // => date, evening/afternoon/moring;
        timeStamp: null, //Date = new Date();
        active: null, //boolean = true;
        archived: false,
        eta: this.printDate(data.eta)
      })
      
    })
  }


   // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getOrdersList(): FirebaseListObservable<Order[]> { 
    this.orders = this.db.list(`/users/${this.afAuth.auth.currentUser.uid}/orders`, {
      query: {
        orderByChild: 'archived',
        equalTo: false
      }
    });
    return this.orders;
  }

  getArchivedList(): FirebaseListObservable<Order[]> { 
    this.orders = this.db.list(`/users/${this.afAuth.auth.currentUser.uid}/orders`, {
      query: {
        orderByChild: 'archived',
        equalTo: true
      }
    });
    return this.orders;
  }

  createTimestamp(list): void {
    let filteredList: Order[] = list.filter(listitem => {
      return listitem.status === "DELIVERED";
    })
    filteredList.forEach(listitem => {
      if (!listitem.timeStamp) {
        this.updateOrder(listitem.key, {timeStamp: Number(new Date())})
      } else {
        if ((Number(new Date()) - Number(listitem.timeStamp))/86400000 > 1) {
          this.updateOrder(listitem.key, {archived: true})
        }
      }
    })
  }

  printDate(timestamp) {
    if (timestamp === null) {
      return 'unavailable'
    }
    var trackDate = "2017-09-02T00:00:00Z";
    var date = timestamp.slice(0, 10);
    var year = timestamp.slice(0, 4);
    var month = timestamp.slice(5, 7);
    var day = timestamp.slice(8, 10);
    
    
    let d = new Date();
    
    d.setFullYear(Number(year), Number(month) - 1, Number(day))
    
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    
    var deliveryTime = days[d.getDay()] + ', ' + monthNames[d.getMonth()] + ' ' + Number(d.getDay()) + ' ' + d.getFullYear()

    return deliveryTime;
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
