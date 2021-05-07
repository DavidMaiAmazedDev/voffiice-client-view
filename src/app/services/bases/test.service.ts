import { Injectable } from '@angular/core';
import { empty, from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { fakeData } from '../../core/helpers/fakeData';
import { TestDataRequestInterface } from '../../core/interfaces/test.dataRequest.interface';

@Injectable({ providedIn: 'root' })
export class TestService123 {
  listOfData = [];
  listColumnNames = ['name', 'age', 'address', 'dob', 'position', 'salary'];
  rdNames = ['Rorbert', 'messi', 'kaka', 'tylor', 'shakira'];
  rdAddresses = ['london', 'paris', 'hanoi', 'amstechdam'];
  rdJobs = ['manager', 'cleaner', 'driver', 'singer', 'doctor'];
  constructor() {}
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  getFakedata(request: TestDataRequestInterface) {
    // generate unique ID: return '_' + Math.random().toString(36).substr(2, 9);
    // @ts-ignore
    // for (let i = 0; i < 1000; i++) {
    //   this.listOfData.push({
    //     id: i + 1,
    //     name: this.rdNames[Math.floor(Math.random() * this.rdNames.length)],
    //     age: Math.floor(Math.random() * (99 - 30)),
    //     address: this.rdAddresses[Math.floor(Math.random() * this.rdAddresses.length)],
    //     dob: this.randomDate(new Date(2012, 1, 1), new Date()),
    //     job: this.rdJobs[Math.floor(Math.random() * this.rdJobs.length)],
    //     extra1: i,
    //     extra2: i,
    //     extra3: i,
    //     extra4: i,
    //     extra5: i,
    //     extra6: i,
    //     salary: Math.floor(Math.random() * (2000 - 100))
    //   });
    // }
    console.log(request);
    const total = fakeData.length;
    const data = fakeData.slice(
      (request.pageIndex - 1) * request.pageSize,
      request.pageIndex * request.pageSize
    );
    // const data = fakeData.slice(0, 20 );
    const response = { total, data };
    console.log(response);
    return of(response).pipe(delay(1000));
    // return empty().pipe(delay(2000));
  }

  getColumnNames() {
    return of(this.listColumnNames);
  }

  deleteSingleRecord(id: number) {
    return of('deleted record having id: ' + id).pipe(delay(1));
  }

  deleteMultipleRecords(ids: Set<number>) {
    return of('deleted record having id: ' + [...ids]).pipe(delay(1));
  }
}
