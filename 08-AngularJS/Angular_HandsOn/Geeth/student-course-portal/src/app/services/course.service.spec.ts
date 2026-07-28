import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';

import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Databases', code: 'CS102', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('gets courses from the configured API URL', () => {
    service.getCourses().subscribe((courses) => expect(courses.length).toBe(2));

    const request = httpMock.expectOne('http://localhost:3000/courses');
    expect(request.request.method).toBe('GET');
    request.flush(mockCourses);
  });

  it('returns the service error message after a failed request', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    let receivedError: Error | undefined;

    service.getCourses().subscribe({ error: (error) => (receivedError = error) });

    for (let attempt = 0; attempt < 3; attempt += 1) {
      httpMock
        .expectOne('http://localhost:3000/courses')
        .flush('Server error', { status: 500, statusText: 'Server Error' });
    }

    expect(receivedError?.message).toBe('Failed to load courses. Please try again.');
    consoleSpy.mockRestore();
  });
});
