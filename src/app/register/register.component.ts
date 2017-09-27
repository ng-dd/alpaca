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
  username: "";
  password: "";
  firstname: "";
  lastname: "";
  newUser: boolean = true;
  passReset: boolean = false;

  constructor(private auth: AuthService, private user: UserService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    // this.buildForm();
  }

  checkToken() {
    console.log(this.afAuth.auth.currentUser)
  }

  toggleForm(): void {
    this.newUser = !this.newUser //toggle login or sign up
  }

  signup(): void {
    this.auth.signup(this.username, this.password, this.firstname, this.lastname)
    // this.user.createUser({
    //   $key: this.afAuth.auth.currentUser.uid,
    //   email: this.afAuth.auth.currentUser.email,
    //   firstname: string,
    //   lastname: string,
    //   imageUrl: string,
    // })
  }

}
