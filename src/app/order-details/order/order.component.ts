import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Order } from '../../shared/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  
  order: Object = null;
  orders: FirebaseListObservable<Order[]> = null;
  user: string = null;

  constructor( public db: AngularFireDatabase, public orderService: OrderService, public afAuth: AngularFireAuth ) {
    this.orders = db.list('/orders')
  }

  ngOnInit() {
    this.getOrder();
  }

  findUser() {
    this.user = this.afAuth.auth.currentUser.email;
    console.log(this.user);
  }

  getOrder() {
    // this.orders.push(this.orderService.getOrder('-Kv09YXEau8J-y8fQCQN'))
    this.orderService.getOrder('-Kv09YXEau8J-y8fQCQN')
      .subscribe(data => {
        this.order = data;
      })
      console.log('ORDER -->', this.order)
  }  
  getOrderList() {
    this.orderService.getOrdersList()
      .subscribe((data) => {
        console.log('LIST -->', data);
      })
  }

}
