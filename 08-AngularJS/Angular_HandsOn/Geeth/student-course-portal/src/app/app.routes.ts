import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { CoursesLayout } from './pages/courses-layout/courses-layout';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      { path: '', component: CourseList },
      { path: ':id', component: CourseDetail },
    ],
  },
  {
    path: 'enroll',
    loadChildren: () => import('./features/enrollment/enrollment.module').then((m) => m.EnrollmentModule),
  },
  { path: 'profile', component: StudentProfile, canActivate: [authGuard] },
  { path: '**', component: NotFound },
];
