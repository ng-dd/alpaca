import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Upload } from '../shared/upload';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedFiles: FileList;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  newUser: boolean = true;
  passReset: boolean = false;
  upload: Upload;
  rForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private user: UserService, private afAuth: AngularFireAuth) { 
    this.rForm = fb.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.upload = new Upload(this.selectedFiles.item(0))
  }

  ngOnInit(): void {

  }

  
  checkToken() {
    console.log(this.afAuth.auth.currentUser.uid)
    var key = this.afAuth.auth.currentUser.uid
  }

  toggleForm(): void {
    this.newUser = !this.newUser //toggle login or sign up
  }

  signup(): void {
    console.log(this.upload)
    this.auth.signup(this.email, this.password, this.firstname, this.lastname, this.upload)
    
  }



}
