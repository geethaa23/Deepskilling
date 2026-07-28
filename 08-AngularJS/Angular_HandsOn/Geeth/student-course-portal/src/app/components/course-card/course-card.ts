import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {
  @Input() course: Course | null = null;
  @Input() appHighlight = 'yellow';
  @Input() isEnrolled = false;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const curr = changes['course'].currentValue;
      console.log('CourseCard ngOnChanges:', { previous: prev, current: curr });
    }
  }

  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': (this.course?.credits ?? 0) >= 4,
      'expanded': this.isExpanded,
    };
  }

  get borderColor() {
    switch (this.course?.gradeStatus) {
      case 'passed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'grey';
    }
  }

  onEnroll() {
    if (!this.course) {
      return;
    }

    const courseId = Number(this.course.id);
    this.store.dispatch(
      this.isEnrolled ? unenrollFromCourse({ courseId }) : enrollInCourse({ courseId }),
    );
    this.enrollRequested.emit(courseId);
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }
}
