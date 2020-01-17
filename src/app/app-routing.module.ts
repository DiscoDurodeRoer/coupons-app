import { LastCouponsComponent } from './components/last-coupons/last-coupons.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CouponComponent } from './components/coupon/coupon.component';


const routes: Routes = [
  { path: 'coupons', component: CoursesComponent },
  { path: 'coupons/course/:id', component: CouponComponent },
  { path: 'add-coupon', component: AddCouponComponent },
  { path: 'last-coupons', component: LastCouponsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'last-coupons' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
