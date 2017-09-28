import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  key: string;
  email: string;
  firstname: string;
  lastname: string;
  imageUrl: string;
  constructor(private userService: UserService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.userService.getUser(this.afAuth.auth.currentUser.uid)
      .subscribe((userData)=>{
        this.key= userData.key
        this.email= userData.email;
        this.firstname= userData.firstname;
        this.lastname= userData.lastname;
        this.imageUrl= userData.imageUrl;
      })
  }

  changeProfile(changeProperty): void {
    this.userService.updateUser(this.key, changeProperty)
  }

}
