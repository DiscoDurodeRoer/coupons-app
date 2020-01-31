import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { DdrBlockItem } from 'ddr-block-list';
import { Coupon } from './../../models/coupon.model.ts';
import { CouponService } from './../../services/coupon.service';
import { Component, OnInit } from '@angular/core';
import { DdrSpinnerService } from 'ddr-spinner';

@Component({
  selector: 'ddr-last-coupons',
  templateUrl: './last-coupons.component.html',
  styleUrls: ['./last-coupons.component.css']
})
export class LastCouponsComponent implements OnInit {

  private coupons: DdrBlockItem[];

  constructor(
    private couponService: CouponService,
    private ddrSpinner: DdrSpinnerService,
    public auth: AuthService,
    private router: Router
  ) {
    this.ddrSpinner.showSpinner();
    this.coupons = [];
  }

  ngOnInit() {
    this.couponService.getLastCoupons().subscribe(coupons => {
      this.coupons = [];
      console.log(coupons);
      let today = new Date();
      coupons.forEach(coupon => {

        let dateEndCoupon = new Date(coupon.end);
        if (dateEndCoupon.getTime() >= today.getTime()) {
          let blockItem = new DdrBlockItem();

          blockItem.item = coupon;
          blockItem.borderColor = "green"
          this.coupons.push(blockItem);
        }


      });

      this.ddrSpinner.hideSpinner();

    });

  }

  selectItem($event) {
    window.open($event.url, "_blank");
    // window.location.href = $event.url;
  }

  goToBack() {
    this.router.navigate(['/manage-coupons']);
  }

}
