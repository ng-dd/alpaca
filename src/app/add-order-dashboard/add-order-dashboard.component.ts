import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-add-order-dashboard',
  templateUrl: './add-order-dashboard.component.html',
  styleUrls: ['./add-order-dashboard.component.css']
})
export class AddOrderDashboardComponent implements OnInit {
  submitted = false;
  
  constructor(
    private orderService: OrderService) { }


  onsubmit() {
    this.submitted = true
  }
  
  ngOnInit() {
  }

}
