import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { Student } from '../models/student.model';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private courseService: CourseService, private http: HttpClient) {}

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    if (this.enrolledCourseIds.length === 0) {
      return of([]);
    }

    const courseRequests = this.enrolledCourseIds.map((id) => this.courseService.getCourseById(id));
    return forkJoin(courseRequests).pipe(
      map((courses) => courses.filter((course): course is Course => !!course)),
    );
  }

  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http
      .get<Student[]>(`${this.apiUrl}/students?courseId=${courseId}`)
      .pipe(
        map((students) => students || []),
      );
  }

  createEnrollment(enrollment: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.apiUrl}/enrollments`, enrollment);
  }
}
