import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../shared/order';
import { FirebaseListObservable } from 'angularfire2/database'; 
// => Do we need to import every time or just once in app component?

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css']
})
export class OrderDashboardComponent implements OnInit {  
  orders: FirebaseListObservable<Order[]>;

  constructor(private orderService: OrderService ) { }

  ngOnInit() {
    this.orders = this.orderService.getOrdersList({limitToLast: 5});
  }

  deleteEverything() {
    this.orderService.deleteEverything();
  }

}
