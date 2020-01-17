import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model.ts';
import { Coupon } from 'src/app/models/coupon.model.ts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ddr-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  public course: Course;
  public coupons: Coupon[];
  public load: boolean;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      let courseID = params['id'];

      this.course = this.courseService.getCourseByID(courseID);
      if (this.course) {
        let today = new Date();
        this.coupons = [];
        this.coupons = this.course.coupons.filter(coupon => 
          coupon.dateStart.getTime() <= today.getTime() 
          && coupon.dateEnd.getTime() >= today.getTime()
        );
        this.load = true;
      }

    })

  }

}
