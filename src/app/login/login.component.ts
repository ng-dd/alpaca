import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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