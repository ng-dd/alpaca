import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../shared/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserService {
  private basePath: '/users';

  users: FirebaseListObservable<User[]> = null; //questionable use
  user: FirebaseObjectObservable<User> = null;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { 
    this.users = db.list('/users'/*, {
      query: {
        orderByChild: 'timestamp'
      }
    }*/)

  }

  getUser(key: string): FirebaseObjectObservable<User> {
    const userPath = `${this.basePath}/${key}`;
    this.user = this.db.object(userPath);
    return this.user;
  }

  findUser(id) {
    
    console.log(this.afAuth.auth.currentUser.uid)
    var userKey = this.afAuth.auth.currentUser.uid;
    this.users.forEach((user) => {
      user.forEach((person) => {
        if (person.key === userKey) {
          this.user = this.db.object(`/users/${userKey}`)
          console.log(this.user)
          this.user.update({
            key: userKey,
            orders: id
          })
        }
      })
    })
  }

  createUser(user: User) {
    this.users.update(user.key, user)
    .catch(error => this.handleError(error));
  }

  updateUser(key: string, value: any): void {
    this.users.update(key, value)
    .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }

}
