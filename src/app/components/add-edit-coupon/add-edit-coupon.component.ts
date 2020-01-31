import { Router } from '@angular/router';
import { DdrToastService } from 'ddr-toast';
import { CouponService } from '../../services/coupon.service';
import { Coupon } from 'src/app/models/coupon.model.ts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ddr-add-edit-coupon',
  templateUrl: './add-edit-coupon.component.html',
  styleUrls: ['./add-edit-coupon.component.css']
})
export class AddEditCouponComponent implements OnInit {

  public coupon: Coupon;
  public localeES: any;
  public today: Date;

  public mode: number;

  public MODE_EDIT = 1;
  public MODE_ADD = 2;

  constructor(
    private couponService: CouponService,
    private toastService: DdrToastService,
    private router: Router
  ) {

    if (this.couponService.actualCoupon) {
      this.coupon = this.couponService.actualCoupon;
      this.mode = this.MODE_EDIT;
    } else {
      this.coupon = new Coupon();
      this.mode = this.MODE_ADD;
    }

    this.coupon.dateStart = new Date();
    this.coupon.dateEnd = new Date();

    this.localeES = {
      firstDayOfWeek: 1,
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
  }

  ngOnInit() {
  }

  addCoupon() {

    if (this.mode === this.MODE_ADD) {
      this.couponService.addCoupon(this.coupon).then(() => {
        this.toastService.addSuccessMessage('Éxito', '¡Has creado un cupón!');
        this.router.navigate(['/manage-coupons']);
      }).catch(error => {
        console.error(error);
      })
    } else {
      this.couponService.editActualCoupon().then(() => {
        this.couponService.actualCoupon = null;
        this.toastService.addSuccessMessage('Éxito', '¡Has actualizado el cupón!');
        this.router.navigate(['/manage-coupons']);
      }).catch(error => {
        console.error(error);
      })
    }


  }

}
