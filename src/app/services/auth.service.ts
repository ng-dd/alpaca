import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UploadService } from '../services/upload.service';
import { Upload } from '../shared/upload';
import * as _ from "lodash";

import { EmailPasswordCredentials } from '../shared/email-password-credentials';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userKey: string;

  constructor(private firebaseAuth: AngularFireAuth, private userService: UserService, private uploadService: UploadService) {
    this.user = firebaseAuth.authState;
  }

  confirmEmail() {
    let user = firebase.auth().currentUser;

    user.sendEmailVerification()
      .then(()=> {console.log('email send')})
      .catch((err)=> {console.log(err, 'error')})
  }

  resetPassword(email: string) {
    let auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(()=> {
        console.log('email sent')
      })
      .catch((err) => {
        console.log(err, 'couldnt send email')
      })
  }

  signup(email: string, password: string, firstname: string, lastname: string, upload: Upload) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {  
        console.log('Success!', value, value.uid);
        this.userService.createUser({
          key: value.uid,
          email: value.email,
          firstname: firstname,
          lastname: lastname,
          imageUrl: null,
          orders: null,
          address: null,
        })
        this.confirmEmail();
        this.uploadService.pushUpload(value.uid, upload);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });    

  }

  facebookLogin() { //bug in which account cannot be wiped from database as long user is still on webpage
    this.firebaseAuth.auth
    .signInWithPopup(new firebase.auth.FacebookAuthProvider)
    .then(res => {
      console.log(res)
      this.userService.createUser({
        key: this.firebaseAuth.auth.currentUser.uid,
        email: this.firebaseAuth.auth.currentUser.email,
        firstname: res.additionalUserInfo.profile.first_name,
        lastname: res.additionalUserInfo.profile.last_name,
        imageUrl: res.additionalUserInfo.profile.picture.data.url,
        orders: null,
        address: null,
      });
    });
  }

  googleLogin() {
    this.firebaseAuth.auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider)
    .then(res => {
      console.log(res)
      this.userService.createUser({
        key: this.firebaseAuth.auth.currentUser.uid,
        email: this.firebaseAuth.auth.currentUser.email,
        firstname: res.additionalUserInfo.profile.given_name,
        lastname: res.additionalUserInfo.profile.family_name,
        imageUrl: res.additionalUserInfo.profile.picture,
        orders: null,
        address: null,
      });
    });
  }
  
  twitterLogin() {
    this.firebaseAuth.auth
    .signInWithPopup(new firebase.auth.TwitterAuthProvider)
    .then(res => {
      console.log(res)
      let nameArray: string[] = res.additionalUserInfo.profile.name.split(' ')
      this.userService.createUser({
        key: this.firebaseAuth.auth.currentUser.uid,
        email: this.firebaseAuth.auth.currentUser.email,
        firstname: nameArray[0],
        lastname: nameArray.length > 1 ? nameArray[nameArray.length - 1] : 'unspecified',
        imageUrl: res.additionalUserInfo.profile.profile_image_url,
        orders: null,
        address: null,
      });
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}