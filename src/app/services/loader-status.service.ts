import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderStatusService {
  public isLoading = new BehaviorSubject(false); // TODO make sure its singleton

  constructor() {
    // this.isLoading.asObservable().subscribe(x => console.warn(x));
  }
}
