import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service'
import { Order } from '../shared/order';
import { FirebaseListObservable } from 'angularfire2/database'; 

// => Do we need to import every time or just once in app component?
// => answer: Everytime you want to use it in a specific component, yes, and overall in app package. -N

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.scss']
})
export class OrderDashboardComponent implements OnInit {  
  orders: FirebaseListObservable<Order[]>;
  
  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    // may need to define some static thing to order
    // this.orders = this.orderService.getOrdersList({limitToLast: 5});
  }

  logout() {
    this.authService.logout();
  }

  // deleteEverything() {
  //   this.orderService.deleteEverything();
  // }

}
