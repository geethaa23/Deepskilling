import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {

  selectedCourseId: number | null = null;

  courses = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4 },
    { id: 2, name: 'ASP.NET Core', code: 'NET201', credits: 3 },
    { id: 3, name: 'SQL Server', code: 'SQL301', credits: 2 },
    { id: 4, name: 'Python', code: 'PY401', credits: 4 },
    { id: 5, name: 'Java', code: 'JV501', credits: 3 }
  ];

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

}