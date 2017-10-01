import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as guessCarrier from 'guess-carrier';

@Component({
  selector: 'app-add-order-dashboard',
  templateUrl: './add-order-dashboard.component.html',
  styleUrls: ['./add-order-dashboard.component.scss']
})
 
export class AddOrderDashboardComponent implements OnInit {
  submitted = false;
  rForm: FormGroup;
  post: any;
  name: string = '';
  store: string = '';
  trackingNumber: string = '';

  
  constructor(private orderService: OrderService, private fb: FormBuilder) {

    function validTracking(input: FormControl) {
      if (guessCarrier(input.value).length === 0) {
        return {invalid: true}
      }
      return null;
    }

    this.rForm = fb.group({
      'name': [null, Validators.required],
      'trackingnumber': new FormControl('', [Validators.required, validTracking]),
      'store': [null, Validators.required]
    })

  }

  addPost(post) {
    let tracking = post.trackingnumber;
    let name = post.name;
    let store = post.store;
    let carrier = guessCarrier(tracking)[0];
    this.orderService.getData(tracking, carrier, name, store);
    this.rForm.reset();
   }

  ngOnInit() {
  }



}
