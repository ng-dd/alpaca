import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../order';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as guessCarrier from 'guess-carrier';

@Component({
  selector: 'app-add-order-dashboard',
  templateUrl: './add-order-dashboard.component.html',
  styleUrls: ['./add-order-dashboard.component.css']
})

export class AddOrderDashboardComponent implements OnInit {
  submitted = false;
  rForm: FormGroup;
  post: any;
  name: string = '';
  store: string = '';
  trackingNumber: string = '';
  
  constructor(private orderService: OrderService, private fb: FormBuilder) {

    this.rForm = fb.group({
      'name': [null, Validators.required],
      'trackingnumber': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(500)])],
      'store': [null, Validators.required]
    })

  }

  addPost(post) {
    let tracking = post.trackingnumber;
    let name = post.name;
    let store = post.store;
    let carrier = guessCarrier(tracking)[0];
    this.orderService.getData(tracking, carrier, name, store);
   }

  ngOnInit() {
  }

}
