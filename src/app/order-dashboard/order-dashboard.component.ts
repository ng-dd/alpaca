import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service'
import { Order } from '../shared/order';
import { User } from '../shared/user';
import { Upload } from '../shared/upload';
import { FirebaseListObservable } from 'angularfire2/database'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../services/user.service';

// => Do we need to import every time or just once in app component?
// => answer: Everytime you want to use it in a specific component, yes, and overall in app package. -N

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.scss']
})
export class OrderDashboardComponent implements OnInit {  
  orders: FirebaseListObservable<Order[]>;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  selectedFiles: FileList;
  upload: Upload;
  key: string;
  userInfo: User = new User();

  constructor(private orderService: OrderService, private authService: AuthService, private afAuth: AngularFireAuth, private userService: UserService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(()=>{
      this.userService.getUser(this.afAuth.auth.currentUser.uid)
      .subscribe((userData)=>{
        this.firstName = userData.firstname;
        this.lastName = userData.lastname;
        this.email = userData.email;
        this.address = userData.address;
        this.key = userData.key
      })
    })
    // may need to define some static thing to order
    // this.orders = this.orderService.getOrdersList({limitToLast: 5});
  }

  logout() {
    this.authService.logout();
  }


  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.upload = new Upload(this.selectedFiles.item(0))
  }

  updateAll() {
    this.userInfo.address = this.address;
    this.userInfo.firstname = this.firstName;
    this.userInfo.lastname = this.lastName;
    this.userInfo.email = this.email;

    this.afAuth.auth.currentUser.updatePassword(this.password); //need another login prior to updating password
  
    this.userService.updateUserAllProperties(this.key, this.userInfo, this.upload);
  }

  // deleteEverything() {
  //   this.orderService.deleteEverything();
  // }

}
