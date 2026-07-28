import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrls: ['./course-summary-widget.css'],
})
export class CourseSummaryWidget implements OnInit {
  courseCount = 0;
  errorMessage = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => (this.courseCount = courses.length),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  addNewCourse(): void {
    const newCourse: Omit<Course, 'id'> = {
      name: `Sample Shared Course ${this.courseCount + 1}`,
      code: `SHR${this.courseCount + 1}`,
      credits: 3,
      gradeStatus: 'pending',
    };

    this.courseService.createCourse(newCourse).subscribe({
      next: () => {
        this.courseCount += 1;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }
}
