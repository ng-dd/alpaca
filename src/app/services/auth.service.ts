import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as guessCarrier from 'guess-carrier';
import { UploadService } from '../services/upload.service';
import { Upload } from '../shared/upload';
import { Order } from '../shared/order';
import { User } from '../shared/user'
import * as _ from "lodash";

import { EmailPasswordCredentials } from '../shared/email-password-credentials';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userKey: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private uploadService: UploadService,
    private orderService: OrderService,
  ) {
    this.user = firebaseAuth.authState;
  }

  confirmEmail() {
    let user = firebase.auth().currentUser;

    user.sendEmailVerification()
      .then(() => { console.log('email send') })
      .catch((err) => { console.log(err, 'error') })
  }

  resetPassword(email: string) {
    let auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent')
      })
      .catch((err) => {
        console.log(err, 'couldnt send email')
      })
  }

  signup(email: string, password: string, firstname: string, lastname: string, upload: Upload, order: object) {
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
          orders: new Order(),
          address: null,
        })
        this.confirmEmail();
        this.uploadService.pushUpload(value.uid, upload);
        if (order) {
          console.log('adding order: ', order)
          this.addPost(order);
        }
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });

  }

  facebookLogin(order: object) {
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
          orders: new Order(),
          address: null,
        });
        if (order) {
          this.addPost(order);
        }
      });
  }

  googleLogin(order: object) {
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
          orders: new Order(),
          address: null,
        });
        if (order) {
          this.addPost(order);
        }
      });
  }

  twitterLogin(order: object): void {
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
        if (order) {
          this.addPost(order);
        }
      });
  }

  login(email: string, password: string, order: object) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        if (order) {
          this.addPost(order)
        }
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  addPost(post) {
    let tracking = post.trackingNumber;
    let name = post.ordername;
    let store = post.store;
    let carrier = guessCarrier(tracking)[0];
    this.orderService.getData(tracking, carrier, name, store);
  }

}