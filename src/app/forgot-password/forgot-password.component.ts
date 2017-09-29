import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  rForm: FormGroup;
  email: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) { 
    this.rForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
    })

  }

  resetPassword(form) {
    console.log(form.email)
    this.authService.resetPassword(form.email);
  }

  ngOnInit() {
  }

}
