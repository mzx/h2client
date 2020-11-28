import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { HistoryTableItem } from './history-table-datasource';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements AfterViewInit, OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<HistoryTableItem>;

  @Input()
  dataSource: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'status', 'clinic', 'doctor', 'speciality'];

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  generateDate(seconds: any) {
    if (!seconds) {
      return new Date();
    }
    return new Date(seconds * 1000);
  }
}
