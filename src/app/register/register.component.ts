import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; //may be overkill but handles all login requirements

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // userForm: FormGroup;
  username: "";
  password: "";
  newUser: boolean = true;
  passReset: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    // this.buildForm();
  }

  toggleForm(): void {
    this.newUser = !this.newUser //toggle login or sign up
  }

  signup(): void {
    this.auth.signup(this.username, this.password);
  }

}
