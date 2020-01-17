import { CouponService } from './../../services/coupon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ddr-last-coupons',
  templateUrl: './last-coupons.component.html',
  styleUrls: ['./last-coupons.component.css']
})
export class LastCouponsComponent implements OnInit {

  constructor(
    private couponService: CouponService
  ) { }

  ngOnInit() {
    this.couponService.getLastCoupons().subscribe(coupons => {
      console.log(coupons);
      
    });
  
  }



}
