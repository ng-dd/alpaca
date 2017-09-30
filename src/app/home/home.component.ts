import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order';
import { Upload } from '../shared/upload';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  trackingNumber: string;
  orderName: string;
  store: string;
  email: string;
  password: string; 
  unsavedTrack: Order;
  loginModal: HTMLElement;
  loginEmail: string;
  loginPassword: string;
  selectedFiles: FileList;
  firstname: string;
  lastname: string;
  newUser: boolean = true;
  passReset: boolean = false;
  upload: Upload;
  rForm: FormGroup;
  
  constructor(public authService: AuthService, private fb: FormBuilder) { 
    this.rForm = fb.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }
  ngOnInit(): void {
    // this.loginModal = document.getElementById('log-in-modal');
  }
  uninitiatedTrack(): void {
    // this.unsavedTrack = new Order(this.orderName, this.trackingNumber, this.store)
  }
  login() {
    this.authService.login(this.email, this.password, this.unsavedTrack);
    this.email = this.password = '';    
  }
  facebookAuth() {
    this.authService.facebookLogin(this.unsavedTrack)
  }
  googleAuth() {
    this.authService.googleLogin(this.unsavedTrack);
  }
  twitterAuth() {
    this.authService.twitterLogin(this.unsavedTrack);
  }
  signup(): void {
    console.log(this.email, this.password, this.firstname, this.lastname, this.upload, this.unsavedTrack)
    this.authService.signup(this.email, this.password, this.firstname, this.lastname, this.upload, this.unsavedTrack)
    
  }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.upload = new Upload(this.selectedFiles.item(0))
  }
}