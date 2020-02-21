import { AuthService } from './auth.service';
import { Coupon } from 'src/app/models/coupon.model.ts';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  // Coupon que se esta utilizando (Editar)
  public actualCoupon: Coupon;

  constructor(
    private afd: AngularFireDatabase,
    private db: AngularFireDatabase,
    private auth: AuthService
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

        // Usuario actual
        coupon.user = this.auth.currentUser();

        // Formateo la fecha
        coupon.start = moment(coupon.dateStart).format('YYYY-MM-DDTHH:mm');

        coupon.end = moment(coupon.dateEnd).format('YYYY-MM-DDTHH:mm');

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

  editActualCoupon(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      try {
        // Formateo la fecha
        this.actualCoupon.start = moment(this.actualCoupon.dateStart).format('YYYY-MM-DDTHH:mm');

        this.actualCoupon.end = moment(this.actualCoupon.dateEnd).format('YYYY-MM-DDTHH:mm');

        this.afd.object("/coupons/" + this.actualCoupon.id).set(this.actualCoupon);
        resolve(true);

      } catch (error) {
        reject('Error al editar el cupon')
      }


    });

  }

  deleteCoupon(idCoupon): Promise<boolean> {


    return new Promise((resolve, reject) => {
      try {
        this.afd.object("/coupons/" + idCoupon).remove()
        resolve(true);
      } catch (error) {
        reject('Error al borrar el cupon')
      }
    });
  }



  getCoupons(): Observable<Coupon[]> {
    return this.afd.list<Coupon>('coupons').valueChanges();
  }

  getLastCoupons(author: string): Observable<Coupon[]> {
    if (author) {
      return this.afd.list<Coupon>('coupons', ref => ref.orderByChild('author').equalTo(author.toLowerCase())).valueChanges();
    }

    return this.afd.list<Coupon>('coupons').valueChanges();
  }

  getCouponsUser(email_user: string): Observable<Coupon[]> {
    return this.db.list<Coupon>('coupons', ref => ref.orderByChild('user').equalTo(email_user)).valueChanges();
  }


}
