import { Coupon } from 'src/app/models/coupon.model.ts';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    private afd: AngularFireDatabase
  ) { }

  addCoupon(coupon: Coupon): Promise<boolean> {

    // Devuelve una promesa
    return new Promise((resolve, reject) => {

      try {

        // Obtengo la referencia de los eventos
        let couponRef = this.afd.database.ref('coupons');

        // añado un nuevo evento
        let newEvent = couponRef.push();

        // Obtengo el id del nuevo evento
        coupon.id = newEvent.key;

        // Formateo la fecha
        coupon.start = moment(coupon.dateStart).format('YYYY-MM-DDTHH:mm');

        if (coupon.dateEnd) {
          coupon.end = moment(coupon.dateEnd).format('YYYY-MM-DDTHH:mm');
        }

        // Obtengo la referencia del registro mas su id
        let couponRefID = this.afd.database.ref('coupons/' + coupon.id);

        // Seteo el valor
        couponRefID.set(coupon);

        // Indico que todo se resolvio bien
        resolve(true);

      } catch (error) {
        // Hubo un error
        reject('Error al añadir el cupón');
      }

    });


  }

  getCoupons(): Observable<Coupon[]> {
    return this.afd.list<Coupon>('coupons').valueChanges();
  }

  getLastCoupons(): Observable<Coupon[]> {
    return this.afd.list<Coupon>('coupons', ref =>
      ref.orderByChild('start').limitToFirst(5)
    ).valueChanges();
  }


}
