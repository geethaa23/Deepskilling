import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  selectedCourseId: number | null = null;
  searchTerm = '';
  courses$!: Observable<Course[]>;
  isLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string | null>;
  enrolledIds$!: Observable<number[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private courseService: CourseService,
  ) {}

  ngOnInit() {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
    this.store.dispatch(loadCourses());
  }

  onSearchChange() {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm || null } });
  }

  navigateToCourse(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  trackByCourseId(index: number, course: { id: number }) {
    return course.id;
  }

  addSampleCourse(): void {
    const newCourse: Omit<Course, 'id'> = {
      name: `Sample Course`,
      code: `SMP`,
      credits: 3,
      gradeStatus: 'pending',
    };
    this.courseService.createCourse(newCourse).subscribe({
      next: () => this.store.dispatch(loadCourses()),
      error: (err) => console.error(err.message),
    });
  }

  onEnroll(courseId: number) {
    this.selectedCourseId = courseId;
  }
}
