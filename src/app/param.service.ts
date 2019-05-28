import { Papa } from 'ngx-papaparse';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  dashboardEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  csvBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject(0);
  csvData;

  constructor() {
    this.csvBehaviorSubject.subscribe(value => {
      this.csvData = value;
    });

    try {
      this.parseData(
        '../assets/CSV_Data.csv',
        this.assingToVariable,
        this.csvBehaviorSubject
      );
    } catch (err) {
      console.log(err);
    }
  }

  assingToVariable(data, csvBehaviorSubject) {
    csvBehaviorSubject.next(data);
  }

  parseData(url, callBack, csvBehaviorSubject) {
    const papa = new Papa();
    papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        callBack(results.data, csvBehaviorSubject);
      }
    });
  }
}
