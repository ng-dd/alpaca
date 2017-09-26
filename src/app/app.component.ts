import { Component } from '@angular/core';

// Firebase
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title= 'Alpaca';
  // Create properties for orders
  user: Observable<firebase.User>;
  orders: FirebaseListObservable<any[]>;

  // Pass in Fire auth and database
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.orders = db.list('/orders', {
      query: {
        orderByChild: 'timestamp'
      }
    });

    this.user = this.afAuth.authState;

  }

  login() {
    this.afAuth.auth.signInWithPopup (new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
// CREATE
  addOrder(newName: string) {
    this.orders.push({ text: newName });
  }
// UPDATE
  updateItem(key: string, newText: string) {
    this.orders.update(key, { text: newText });
  }
// DELETE
  deleteItem(key: string) {
    this.orders.remove(key);
  }
// DELETE ALL
  deleteEverything() {
    this.orders.remove();
  }

}
