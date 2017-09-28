import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms'; //may be overkill but handles all login requirements

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // userForm: FormGroup;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  newUser: boolean = true;
  passReset: boolean = false;

  constructor(private auth: AuthService, private user: UserService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {

  }

  
  checkToken() {
    console.log(this.afAuth.auth.currentUser.uid)
    var key = this.afAuth.auth.currentUser.uid
    // this.user.findUser(key)
  }

  toggleForm(): void {
    this.newUser = !this.newUser //toggle login or sign up
  }

  signup(): void {
    this.auth.signup(this.email, this.password, this.firstname, this.lastname)
  }

}
