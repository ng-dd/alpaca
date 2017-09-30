import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Order } from '../shared/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order = null;

  constructor(public orderService: OrderService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  getOrder(order) {
    this.orderService.getOrder(order)
      .subscribe(data => {
        this.order = data;
      })
      // console.log('ORDER -->', this.order)
  }  

}
