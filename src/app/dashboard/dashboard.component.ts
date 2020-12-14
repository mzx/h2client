import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

export interface Accreditation {
  ID: string;
  Doctor: string;
  Clinic: string;
  Speciality: string;
  Status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  reload = new BehaviorSubject<any>('');
  all: Observable<Accreditation[]>;
  colNum: Observable<number>;

  constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar,
              private breakpointObserver: BreakpointObserver,
              private router: Router) {
    const allGet = httpClient.get<any>('api/chaincode/acc').pipe(
      map(r => r.map(x => x.Record))
    );

    this.all = this.reload.pipe(switchMap(() => allGet));

    this.colNum = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({matches}) => matches ? 1 : 3)
    );

  }

  delete = ({ID}: Accreditation) => {
    this.httpClient.delete(`api/chaincode/acc/${ID}`).pipe(
      take(1),
      tap(() => this.matSnackBar.open('Deleted Successfully', null, {duration: 700})),
      tap(() => this.reload.next('reload')),
      catchError(err => of(err))
    ).subscribe();
  };

  fail = (acc: Accreditation) => {
    this.updateStatus(acc, 'Failed');
  };

  approve = (acc: Accreditation) => {
    this.updateStatus(acc, 'Approved');
  };

  history = (acc: Accreditation) => {
    this.router.navigate(['history', acc.ID]);
  };

  private updateStatus = (acc: Accreditation, status: string) => {
    this.httpClient.post(`api/chaincode/acc/updateStatus`, {id: acc.ID, status}).pipe(
      take(1),
      tap(() => this.matSnackBar.open('Status Updated Successfully', null, {duration: 700})),
      tap(() => this.reload.next('reload')),
      catchError(err => of(err))
    ).subscribe();
  };
}
