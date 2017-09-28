import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../shared/user';

@Injectable()
export class UserService {
  private basePath: '/users';

  users: FirebaseListObservable<User[]> = null; //questionable use
  user: FirebaseObjectObservable<User> = null;

  constructor(private db: AngularFireDatabase) { 
    this.users = db.list('/users')

  }

  getUser(key: string): FirebaseObjectObservable<User> {
    const userPath = `/users/${key}`;
    this.user = this.db.object(userPath);
    return this.user;
  }
  createUser(user: User) {
    this.getUser(user.key)
    .subscribe((data) =>{
      if (data.key === undefined) {
        console.log('creating user')
        this.users.update(user.key, user)
        .catch(error => this.handleError(error));
      }
    })
  }

  updateUser(key: string, value: any): void {
    this.users.update(key, value)
    .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }

}
