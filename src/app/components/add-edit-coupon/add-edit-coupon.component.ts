import { AuthService } from './../../services/auth.service';
import { DdrConfigurationService } from 'ddr-configuration';
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

  public platforms: any[];
  public platformSelected: any;

  constructor(
    private couponService: CouponService,
    private toastService: DdrToastService,
    private router: Router,
    private config: DdrConfigurationService,
    private auth: AuthService
  ) {

    this.platforms = this.config.getData('platforms');
    this.platformSelected = this.platforms[0];

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

    this.coupon.platform = this.platformSelected.name;
    this.coupon.urlComplete = this.platformSelected.url + this.coupon.urlCourse + "%2F?" + this.platformSelected.paramCode + "=" + this.coupon.code;

    if (this.auth.currentUser() === 'administrador@discoduroderoer.es') {
      this.coupon.urlComplete = this.coupon.urlComplete.replace(/%2F/g, '/').replace(/%3A/g, ':');
    } else {
      this.coupon.urlComplete = "https://click.linksynergy.com/link?id=5X/B5Fmfunc&offerid=507388&type=2&murl=" + this.coupon.urlComplete;
    }
    console.log(this.coupon.urlComplete);

    if (this.mode === this.MODE_ADD) {
      this.couponService.addCoupon(this.coupon).then(() => {
        this.toastService.addSuccessMessage('Éxito', '¡Has creado un cupón!');
        this.router.navigate(['/gestionar-coupones']);
      }).catch(error => {
        console.error(error);
      })
    } else {
      this.couponService.editActualCoupon().then(() => {
        this.couponService.actualCoupon = null;
        this.toastService.addSuccessMessage('Éxito', '¡Has actualizado el cupón!');
        this.router.navigate(['/gestionar-coupones']);
      }).catch(error => {
        console.error(error);
      })
    }


  }

}
