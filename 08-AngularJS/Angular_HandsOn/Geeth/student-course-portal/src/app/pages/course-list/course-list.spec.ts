import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { CourseService } from '../../services/course.service';

import { CourseList } from './course-list';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' as const },
    { id: 2, name: 'Databases', code: 'CS102', credits: 3, gradeStatus: 'pending' as const },
  ];

  const initialState = {
    course: { courses: mockCourses, loading: false, error: null },
    enrollment: { enrolledCourseIds: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState }),
        { provide: CourseService, useValue: { createCourse: () => of(mockCourses[0]) } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders course cards from the MockStore state', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-course-card').length).toBe(2);
  });

  it('shows the loading indicator when the MockStore loading state changes', () => {
    fixture.detectChanges();
    store.setState({
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] },
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Loading courses...');
  });
});
