import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { DdrSpinnerService } from 'ddr-spinner';
import { CouponService } from './../../services/coupon.service';
import { DdrBlockItem, DdrAction } from 'ddr-block-list';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ddr-manage-coupons',
  templateUrl: './manage-coupons.component.html',
  styleUrls: ['./manage-coupons.component.css']
})
export class ManageCouponsComponent implements OnInit {

  private coupons: DdrBlockItem[];

  private EDIT_COUPON = 'EDIT_COUPON'
  private COPY_COUPON = 'COPY_COUPON'
  private REMOVE_COUPON = 'REMOVE_COUPON'

  constructor(
    private couponService: CouponService,
    private ddrSpinner: DdrSpinnerService,
    public auth: AuthService,
    public router: Router
  ) {
    this.ddrSpinner.showSpinner();
    this.coupons = [];
  }

  ngOnInit() {
    this.couponService.getCouponsUser(this.auth.currentUser()).subscribe(coupons => {
      this.coupons = [];
      console.log(coupons);

      let actions: DdrAction[] = [
        {
          'label': "Editar cupón",
          'value': this.EDIT_COUPON
        },
        {
          'label': "Copiar cupón",
          'value': this.COPY_COUPON
        },
        {
          'label': "Eliminar cupón",
          'value': this.REMOVE_COUPON
        }
      ];

      coupons.forEach(coupon => {
        let blockItem = new DdrBlockItem();
        blockItem.item = coupon;
        blockItem.borderColor = "green"

        blockItem.actions = actions;

        this.coupons.push(blockItem);

      });
      this.ddrSpinner.hideSpinner();
    });
  }

  addCoupon() {
    this.router.navigate(['add-coupon']);
  }

  getAction($event: DdrAction) {

    
    switch ($event.value) {
      case this.EDIT_COUPON:
        this.couponService.actualCoupon = $event.item;
        this.router.navigate(['edit-coupon']);
        break;
      case this.COPY_COUPON:

        break;
      case this.REMOVE_COUPON:
        // Poner mensaje
        this.couponService.deleteCoupon($event.item.id);
        break;
    }
  }

}
