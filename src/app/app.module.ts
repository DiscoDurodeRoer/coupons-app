
// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination/dist/ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

// Pipe
import { SanitizePipe } from './pipes/sanitize.pipe';

// Components
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { LastCouponsComponent } from './components/last-coupons/last-coupons.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';

const firebaseConfig = {
  apiKey: "AIzaSyBMwN6ZS6UFOgkzKpmg_5B8D1scmrupRq0",
  authDomain: "cupones-bc833.firebaseapp.com",
  databaseURL: "https://cupones-bc833.firebaseio.com",
  projectId: "cupones-bc833",
  storageBucket: "cupones-bc833.appspot.com",
  messagingSenderId: "891933743299",
  appId: "1:891933743299:web:7a19da49f6747be0c16a76",
  measurementId: "G-HDWSF8QGGT"
};

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CouponComponent,
    SanitizePipe,
    LastCouponsComponent,
    AddCouponComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CalendarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
