import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TestInterface} from '../interfaces/test-interface';

@Injectable()
export class TestService implements TestInterface{
prefix = 'root';
  constructor() {
  }

  testFuntion(msg: string): void {
    console.log(`${this.prefix}: ${msg}`);
  }

  log(msg: string): void {
    console.log(`${this.prefix}: ${msg}`);
  }
}
