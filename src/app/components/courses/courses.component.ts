import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model.ts';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'ddr-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public courses: Course[];
  public itemsPerPage: number = 3;
  public page: number = 1;

  constructor(private courseService: CourseService, private route: Router, private activatedRouted: ActivatedRoute) { }

  ngOnInit() {
    this.courses = this.courseService.getCourses();
    console.log(this.courses);

  }

  // goTo(id: string) {
  //   this.route.navigate(['/udemy-coupons/course', id], { relativeTo: this.activatedRouted });
  // }

}
