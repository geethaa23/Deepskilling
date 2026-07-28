import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (typeof value === 'string' && value.trim().toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  const value = control.value as string;
  return new Promise((resolve) => {
    setTimeout(() => {
      if (typeof value === 'string' && value.toLowerCase().includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrls: ['./reactive-enrollment-form.css'],
})
export class ReactiveEnrollmentForm {
  enrollForm: FormGroup;
  submitting = false;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array<FormControl<string | null>>([]),
    });
  }

  get additionalCourses(): FormArray<FormControl<string | null>> {
    return this.enrollForm.get('additionalCourses') as FormArray<FormControl<string | null>>;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl<string | null>('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  submit(): void {
    this.submitting = true;
    if (this.enrollForm.valid) {
      console.log('Form value:', this.enrollForm.value);
      console.log('Form raw value:', this.enrollForm.getRawValue());
      this.submitted = true;
    } else {
      this.enrollForm.markAllAsTouched();
    }
    this.submitting = false;
  }

  reset(): void {
    this.enrollForm.reset({
      studentName: '',
      studentEmail: '',
      courseId: '',
      preferredSemester: 'Odd',
      agreeToTerms: false,
      additionalCourses: [],
    });
    while (this.additionalCourses.length) {
      this.additionalCourses.removeAt(0);
    }
    this.submitted = false;
  }

  /**
   * enrollForm.value excludes disabled controls.
   * enrollForm.getRawValue() returns all controls, including disabled ones.
   */
}
