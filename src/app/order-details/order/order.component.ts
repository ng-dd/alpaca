import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Order } from '../../shared/order';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent {
  
  order: Order = null;
  orders: Order[] = null;
  user: string = null;
  checked: boolean = false;
  rForm: FormGroup;
  thing: object;
  

  constructor(private fb: FormBuilder, public db: AngularFireDatabase, public orderService: OrderService, public afAuth: AngularFireAuth ) {
    // this.orders = db.list('/orders')
    afAuth = this.afAuth;
    // this.authenticated();
  }

  saveThing(item) {
    this.thing = item;
    console.log(item)
  }

  ngOnInit(): void {
    this.afAuth.auth.onIdTokenChanged((user) => {
      if (user) {
        this.getList();
      }
    })
  }  
      
  findUser() {
    // this.user = this.afAuth.auth.currentUser;
    console.log(this.afAuth.auth.currentUser);
  }

  getOrder(order) {
    this.orderService.getOrder(order)
      .subscribe(data => {
        this.order = data;
      })
      // console.log('ORDER -->', this.order)
  }  

  getList() {
    this.orderService.getOrdersList()
      .subscribe((data) => {
        // console.log('LIST -->', data);
        this.orders = data;
        // this.orderService.createTimestamp(new Date());
      })
  }

}
