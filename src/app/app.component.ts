import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoaderStatusService } from 'src/app/services/loader-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showProgressbar: boolean;

  constructor(public loaderservice: LoaderStatusService) {
    this.loaderservice.isLoading.asObservable().pipe(
      delay(1)
    ).subscribe(

      x => this.showProgressbar = x
    );
  }
}
