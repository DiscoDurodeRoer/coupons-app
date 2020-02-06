// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { APP_INITIALIZER } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination/dist/ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { DdrBlockListModule } from 'ddr-block-list';
import { DdrSpinnerModule } from 'ddr-spinner';
import { DdrToastModule } from 'ddr-toast';

// services
import { DdrConfigurationModule, DdrConfigurationService } from 'ddr-configuration';


// Pipe
import { SanitizePipe } from './pipes/sanitize.pipe';

// Components
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { LastCouponsComponent } from './components/last-coupons/last-coupons.component';
import { AddEditCouponComponent } from './components/add-edit-coupon/add-edit-coupon.component';
import { ManageCouponsComponent } from './components/manage-coupons/manage-coupons.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

export function configFactory(provider: DdrConfigurationService) {
  return () => provider.getDataFromJSON('assets/data/platforms.json');
}

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
    AddEditCouponComponent,
    LoginComponent,
    CreateAccountComponent,
    ManageCouponsComponent,
    HeaderComponent
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
    FormsModule,
    DdrBlockListModule,
    DdrSpinnerModule,
    DdrToastModule,
    DdrConfigurationModule
  ],
  providers: [
    DdrConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [DdrConfigurationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
