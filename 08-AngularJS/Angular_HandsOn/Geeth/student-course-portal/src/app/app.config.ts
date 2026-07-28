import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './services/http-auth.interceptor';
import { errorInterceptor } from './services/http-error.interceptor';
import { loadingInterceptor } from './services/loading.interceptor';
import { CourseEffects } from './store/course/course.effects';
import { courseReducer } from './store/course/course.reducer';
import { enrollmentReducer } from './store/enrollment/enrollment.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])),
    provideStore({
      course: courseReducer,
      enrollment: enrollmentReducer,
    }),
    provideEffects([CourseEffects]),
    provideStoreDevtools({ maxAge: 25, name: 'Student Course Portal' }),
  ],
};
