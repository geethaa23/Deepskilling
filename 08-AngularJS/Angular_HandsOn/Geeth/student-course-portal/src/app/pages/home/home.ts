import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { Notification } from '../../components/notification/notification';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CourseSummaryWidget, Notification],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  courseCount = 0;
  enrolledCount = 0;
  errorMessage = '';

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
  ) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courseCount = courses.length;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });

    this.enrollmentService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.enrolledCount = courses.length;
      },
      error: (err) => {
        console.error(err);
      },
    });

    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }
}
