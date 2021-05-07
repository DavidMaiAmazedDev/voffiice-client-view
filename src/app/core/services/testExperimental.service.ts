import { Injectable } from '@angular/core';
import { TestInterface } from '../interfaces/test-interface';

@Injectable({
  providedIn: 'root',
})
export class TestExperimentalService implements TestInterface {
  prefix = 'root';
  constructor() {}

  log(msg: string): void {
    console.log(`${this.prefix}(experimental): ${msg}`);
  }
}
