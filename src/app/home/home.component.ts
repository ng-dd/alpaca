import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trackingNumber: string;
  orderName: string;
  store: string;
  email: string;
  password: string; 
  unsavedTrack: Order;
  loginModal: HTMLElement;
  

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.loginModal = document.getElementById('log-in-modal');
    // this.whenStable()
  }

  

  uninitiatedTrack(): void {
    this.unsavedTrack = new Order(this.orderName, this.trackingNumber, this.store)
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  facebookAuth() {
    this.authService.facebookLogin()
  }

  googleAuth() {
    this.authService.googleLogin();
  }

  twitterAuth() {
    this.authService.twitterLogin();
  }


}
