import { LoginGuard } from './services/login-guard.service';
import { ManageCouponsComponent } from './components/manage-coupons/manage-coupons.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { LastCouponsComponent } from './components/last-coupons/last-coupons.component';
import { AddEditCouponComponent } from './components/add-edit-coupon/add-edit-coupon.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CouponComponent } from './components/coupon/coupon.component';


const routes: Routes = [
  { path: 'coupons', component: CoursesComponent },
  { path: 'coupons/course/:id', component: CouponComponent },
  { path: 'aniadir-cupon', component: AddEditCouponComponent, canActivate: [LoginGuard] },
  { path: 'edit-coupon', component: AddEditCouponComponent, canActivate: [LoginGuard] },
  { path: 'ultimos-cupones', component: LastCouponsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'gestionar-cupones', component: ManageCouponsComponent, canActivate: [LoginGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'ultimos-cupones' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
