import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  id: Observable<string>;
  history: Observable<any>;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.route.paramMap.pipe(map(paramMap => paramMap.get('id')));

    this.history = this.id.pipe(switchMap(
      id => httpClient.get(`api/chaincode/acc/assetHistory/${id}`)
    ));

  }

  ngOnInit(): void {
  }

}
