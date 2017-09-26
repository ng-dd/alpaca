import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFire } from 'angularfire2'; deprecated
import * as firebase from 'firebase/app';

import { EmailPasswordCredentials } from '../shared/email-password-credentials';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  provider = new firebase.auth.FacebookAuthProvider();
  // authState: FirebaseAuthState = null;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {  
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  // facebookLogin() {
    
  // }

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