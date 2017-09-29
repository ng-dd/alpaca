import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

//angular fire shit
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string; 

  constructor(public authService: AuthService) {}

  // signup() {
  //   this.authService.signup(this.email, this.password);
  //   this.email = this.password = '';
  // }

  forgotPassword() {
    console.log(this.email);
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  facebookAuth() {
    this.authService.facebookLogin();
  }

  googleAuth() {
    this.authService.googleLogin();
  }

  twitterAuth() {
    this.authService.twitterLogin();
  }

  logout() {
    this.authService.logout();
  }


}