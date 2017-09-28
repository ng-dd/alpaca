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
  orders: Order[] = null;
  user: string = null;

  constructor( public db: AngularFireDatabase, public orderService: OrderService, public afAuth: AngularFireAuth ) {
    // this.orders = db.list('/orders')
  }

  ngOnInit() {
    this.getOrderList();
  }

  findUser() {
    this.user = this.afAuth.auth.currentUser.email;
    console.log(this.user);
  }

  getOrder(order) {
    this.orderService.getOrder(order)
      .subscribe(data => {
        this.order = data;
      })
      // console.log('ORDER -->', this.order)
  }  

  getOrderList() {
    this.orderService.getOrdersList()
      .subscribe((data) => {
        // console.log('LIST -->', data);
        this.orders = data;
        this.orderService.createTimestamp(data);
        console.log('timestamp updated!');
      })
  }

}
