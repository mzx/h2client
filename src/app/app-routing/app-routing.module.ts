import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicantFormComponent } from 'src/app/applicant-form/applicant-form.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { HistoryComponent } from 'src/app/history/history.component';

const routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {
    path: 'apply',
    component: ApplicantFormComponent,
    data: {animation: 'apply'}
  },
  {
    path: 'list',
    component: DashboardComponent,
    data: {animation: 'list'}
  },
  {
    path: 'history/:id',
    component: HistoryComponent,
    data: {animation: 'history'}
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {}
