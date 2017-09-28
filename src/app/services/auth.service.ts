import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { EmailPasswordCredentials } from '../shared/email-password-credentials';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private userService: UserService) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string, firstname: string, lastname: string) {
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
          orders: null
        })
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
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