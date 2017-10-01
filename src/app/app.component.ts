import { Component } from '@angular/core';

// Firebase
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Order } from './shared/order';

// services
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title= 'Alpaca';
  // Create properties for orders
  user: Observable<firebase.User>;
  order: FirebaseListObservable<Order> = null;
  orders: FirebaseListObservable<Order[]> = null;

  // Pass in Fire auth and database
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public orderService: OrderService) {
    this.orders = db.list('/orders', {
      query: {
        orderByChild: 'timestamp'
      }
    });

    // ngOnInit() {
    //   this.afAuth.authState.subscribe(user => {
    //     if (user) {
    //       // go to home page
    //     } else {
    //       // go to login page
    //     }
    //   });
    // }
    
    this.user = this.afAuth.authState;
  }



}
