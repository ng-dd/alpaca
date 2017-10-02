import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order';
import { Upload } from '../shared/upload';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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

  //variables for nav bar
  burger
  menu
  menuList
  brand
  menuItems
  active:boolean = false;

  constructor(public authService: AuthService, 
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    // public mr: NgbModalRef
  ) { 
    this.rForm = fb.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    })
    afAuth.auth.onAuthStateChanged((res)=> {
      console.log('Auth state changed');
      if (res.uid){
        console.log(document.getElementById('close'));
        document.getElementById('close').click()
        this.router.navigate(['/dashboard'])
      }
    });
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((res)=> {
      if (res.uid) {
        this.router.navigate(['/dashboard'])
      }
    })
    this.burger = document.querySelector('.burger');
    this.menu = document.querySelector('.menu');
    this.menuList = document.querySelector('.menu__list');
    this.brand = document.querySelector('.menu__brand');
    this.menuItems = document.querySelectorAll('.menu__item');
  }

  uninitiatedTrack(): void {
    this.unsavedTrack = {
      ordername: this.orderName, 
      tracking: this.trackingNumber, 
      store: this.store
    }
  }

  login() {
    this.authService.login(this.loginEmail, this.loginPassword, this.unsavedTrack);
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

  toggleMenu() {
    console.log('trying to toggle menu', this.menu)
    if (!this.active) {
      this.menu.classList.add('menu--active');
      this.menuList.classList.add('menu__list--active');
      this.brand.classList.add('menu__brand--active');
      this.burger.classList.add('burger--close');
      for (var i = 0, ii = this.menuItems.length; i < ii; i++) {
        this.menuItems[i].classList.add('menu__item--active');
      }
      
      this.active = true;
    } else {
      this.menu.classList.remove('menu--active');
      this.menuList.classList.remove('menu__list--active');
      this.brand.classList.remove('menu__brand--active');
      this.burger.classList.remove('burger--close');
      for (var i = 0, ii = this.menuItems.length; i < ii; i++) {
        this.menuItems[i].classList.remove('menu__item--active');
      }
      
      this.active = false;
    }
  }

}
