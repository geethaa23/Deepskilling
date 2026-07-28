import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { SimpleChange } from '@angular/core';
import { vi } from 'vitest';

import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the course name supplied through its input', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('h3')).nativeElement.textContent).toContain(
      'Data Structures',
    );
  });

  it('emits the course id when Enroll is clicked', () => {
    component.course = mockCourse;
    const emitSpy = vi.spyOn(component.enrollRequested, 'emit');
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.card-actions button')).nativeElement.click();

    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('changes the details button text when details are toggled', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    fixture.debugElement.queryAll(By.css('.card-actions button'))[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.isExpanded).toBe(true);
  });

  it('logs course changes in ngOnChanges', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true),
    });

    expect(consoleSpy).toHaveBeenCalledWith('CourseCard ngOnChanges:', {
      previous: null,
      current: mockCourse,
    });
    consoleSpy.mockRestore();
  });
});
