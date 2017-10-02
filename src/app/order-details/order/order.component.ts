import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Order } from '../../shared/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent {
  
  orders: Order[] = null;
  user: string = null;
  checked: boolean = false;
  currentOrder: Object;

  constructor( public db: AngularFireDatabase, public orderService: OrderService, public afAuth: AngularFireAuth ) {
    // this.orders = db.list('/orders')
    afAuth = this.afAuth;
  }

  saveItem(item) {
    this.currentOrder = item;
    console.log(item)
  }
  delete(item) {
    this.orderService.deleteOrder(item);
  }

  ngOnInit() {

    this.afAuth.auth.onIdTokenChanged(user => {
        if(user) {
          this.getList()
        }
    })

  }
  
      
  findUser() {
    // this.user = this.afAuth.auth.currentUser;
    console.log(this.afAuth.auth.currentUser);
  }

  getList() {
    this.orderService.getOrdersList()
      .subscribe((data) => {
        // console.log('LIST -->', data);
        this.orders = data;
        this.orderService.createTimestamp(this.orders);
      })
  }

}

