import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course: Course | undefined;
  courseId: number | null = null;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit() {
    const idValue = this.route.snapshot.paramMap.get('id');
    this.courseId = idValue ? Number(idValue) : null;
    if (this.courseId !== null) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (course) => (this.course = course),
        error: (err) => (this.errorMessage = err.message),
      });
    }
  }
}
