import { IFilter } from './../../models/filter';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  public couponsOriginal: DdrBlockItem[];
  public couponsFiltered: DdrBlockItem[];
  public author: string;

  constructor(
    public couponService: CouponService,
    private ddrSpinner: DdrSpinnerService,
    public auth: AuthService,
    private router: ActivatedRoute
  ) {
    this.ddrSpinner.showSpinner();
    this.couponsOriginal = [];
    this.couponsFiltered = [];
    this.router.params.subscribe(params => {
      this.author = params['autor'];
      console.log(this.author);
    })
  }

  ngOnInit() {

    this.couponService.getLastCoupons(this.author).subscribe(coupons => {
      this.couponsOriginal = [];
      this.couponsFiltered = [];
      console.log(coupons);
      let today = new Date();
      coupons.forEach(coupon => {

        let dateEndCoupon = new Date(coupon.end);
        if (dateEndCoupon.getTime() >= today.getTime()) {
          let blockItem = new DdrBlockItem();

          blockItem.item = coupon;
          blockItem.borderColor = "green"
          this.couponsOriginal.push(blockItem);
        }


      });

      this.ddrSpinner.hideSpinner();

      this.couponsFiltered = this.couponsOriginal.slice(0);

    });

  }



  selectItem($event) {
    console.log($event.urlComplete);
    window.open($event.urlComplete, "_blank");
    // window.location.href = $event.url;
  }

  filterCoupons($event: IFilter) {

    this.couponsFiltered = this.couponsOriginal.slice(0);

    if ($event) {

      this.ddrSpinner.showSpinner();

      if ($event.start) {
        this.couponsFiltered = this.couponsFiltered.filter(c => new Date(c.item.start).getTime() >= $event.start.getTime());
      }

      if ($event.end) {
        this.couponsFiltered = this.couponsFiltered.filter(c => new Date(c.item.end).getTime() <= $event.end.getTime());
      }

      this.couponsFiltered = this.couponsFiltered.filter(c => c.item.course_name.toLowerCase().includes($event.name));

      if ($event.author) {
        this.couponsFiltered = this.couponsFiltered.filter(c => c.item.author.toLowerCase().includes($event.author));
      }

      if ($event.platform) {
        this.couponsFiltered = this.couponsFiltered.filter(c => c.item.platform.toLowerCase() == $event.platform.toLowerCase());
      }

      this.ddrSpinner.hideSpinner();

    }
  }

}
