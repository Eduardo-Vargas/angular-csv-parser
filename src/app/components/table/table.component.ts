import { Component, OnInit } from '@angular/core';
import { ParamService } from '../../param.service';
import { Sort } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

export interface CSVDataType {
  URL: string;
  Platform: string;
  Time: Date;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private csvData: any;
  csvBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject(0);

  constructor(paramService: ParamService) {
    paramService.csvBehaviorSubject.subscribe(value => {
      if (value !== 0) {
        this.csvData = value;
        this.sortedData = this.csvData.slice();
      }
    });
  }

  sortedData: CSVDataType[];

  ngOnInit() {}

  sortData(sort: Sort) {
    const data = this.csvData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'URL':
          return compare(a.URL, b.URL, isAsc);
        case 'Platform':
          return compare(a.Channel, b.Channel, isAsc);
        case 'Time':
          return compare(a.Time, b.Time, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(
  a: number | string | Date,
  b: number | string | Date,
  isAsc: boolean
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
