import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order';
import { Upload } from '../shared/upload';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //packing variables
  trackingNumber: string;
  orderName: string;
  store: string;
  unsavedTrack: object = null;

  //login variables
  loginEmail: string;
  loginPassword: string;

  //registration variables
  selectedFiles: FileList;
  firstname: string;
  lastname: string;
  newUser: boolean = true;
  passReset: boolean = false;
  email: string;
  password: string; 
  upload: Upload;
  uid: string;
  rForm: FormGroup;
  

  constructor(public authService: AuthService, 
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router) { 
    this.rForm = fb.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    })
    afAuth.auth.onAuthStateChanged((res)=>{
      if (res.uid){
        document.getElementById('close').click()
        this.router.navigate(['/dashboard'])
      }
    });
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((res)=>{
      if (res.uid){
        this.router.navigate(['/dashboard'])
      }
    })
  }

  uninitiatedTrack(): void {
    this.unsavedTrack = {
      ordername: this.orderName, 
      tracking: this.trackingNumber, 
      store: this.store
    }
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

  forgotPassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.loginEmail);
  }


}
