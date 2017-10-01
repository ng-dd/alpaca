/* END OF PROJECT NOTE: Commented out modules or components we should remove later */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutingModule } from './routing/routing.module';
// Firebase - Require Firebase config, db, auth
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { UploadService } from './services/upload.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddOrderDashboardComponent } from './add-order-dashboard/add-order-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order-details/order/order.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    OrderDashboardComponent,
    OrderDetailsComponent,
    AddOrderDashboardComponent,
    NotFoundComponent,
    RegisterComponent,
    OrderComponent,
    UserComponent,
    HomeComponent,
    ForgotPasswordComponent,
    FooterComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    // NgbModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    OrderService,
    UserService,
    UploadService,
    FormBuilder
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})

export class AppModule { }
