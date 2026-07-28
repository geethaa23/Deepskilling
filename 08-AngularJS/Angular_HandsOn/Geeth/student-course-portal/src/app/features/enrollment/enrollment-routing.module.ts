import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentForm } from '../../pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from '../../pages/reactive-enrollment-form/reactive-enrollment-form';
import { unsavedChangesGuard } from '../../guards/unsavedchanges.guard';

const routes: Routes = [
  { path: '', component: EnrollmentForm },
  { path: 'reactive', component: ReactiveEnrollmentForm, canDeactivate: [unsavedChangesGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes), EnrollmentForm, ReactiveEnrollmentForm],
  exports: [RouterModule],
})
export class EnrollmentRoutingModule {}
