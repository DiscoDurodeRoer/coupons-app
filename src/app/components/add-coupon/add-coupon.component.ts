import { CouponService } from './../../services/coupon.service';
import { Coupon } from 'src/app/models/coupon.model.ts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ddr-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  public coupon: Coupon;
  public localeES: any;
  public today: Date;

  constructor(
    private couponService: CouponService
  ) {
    this.coupon = new Coupon();

    this.today = new Date();

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

    this.coupon.code = "DDR_ENERO_1_2020";
    this.couponService.addCoupon(this.coupon).then( () => {
      console.log("cupon creado");
    }).catch(error => {
      console.error(error);
    })

  }

}
