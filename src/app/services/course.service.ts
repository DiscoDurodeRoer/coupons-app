import { Coupon } from '../models/coupon.model.ts';
import { Course } from '../models/course.model.ts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public _data: Course[];

  constructor(private http: HttpClient) { }

  public getData() {
    // return new Promise((resolve, reject) => {
    //   this.http.get('assets/data/coupons.json')
    //     .subscribe(data => {
    //       this._data = [];
    //       (<Course[]>data).forEach(c => {

    //         let coupons: Coupon[] = [];

    //         c.coupons.forEach(co => {

    //           let coupon: Coupon = new Coupon(co.price, co.url, new Date(co.dateStart), new Date(co.dateEnd));

    //           coupons.push(coupon);

    //         });

    //         coupons = coupons.sort((a, b) => a.price - b.price)

    //         let course: Course = new Course(c.id, c.name, c.img, coupons, c.description);

    //         this._data.push(course);
    //       })



    //       resolve(true);
    //     }, error => {
    //       console.log('Error al recuperar los cupones: ' + error);
    //       reject(true);
    //     });
    // });
  }

  getCourses() {
    return this._data;
  }

  getCourseByID(id: string): Course {
    return this._data.find(course => course.id === id);
  }

}
