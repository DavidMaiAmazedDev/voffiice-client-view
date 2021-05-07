export class TestModel {
  id: number;
  name: string;
  age: number;
  address: string;
  dob: string;
  job: string;
  extra1: number;
  extra2: number;
  extra3: number;
  extra4: number;
  extra5: number;
  extra6: number;
  salary: number;

  constructor(data: any) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.age = data.age || 0;
    this.address = data.address || '';
    this.dob = data.dob || null;
    this.job = data.job || '';
    this.extra1 = data.extra1 || 0;
    this.extra2 = data.extra2 || 0;
    this.extra3 = data.extra3 || 0;
    this.extra4 = data.extra4 || 0;
    this.extra5 = data.extra5 || 0;
    this.extra6 = data.extra6 || 0;
    this.salary = data.salary || 0;
  }
}

export class TestSearchModel {
  name: string;
  age: number;
  address: string;
  dob: Date;
  job: string;
  salary: number;
  constructor(data: any) {
    this.name = data.name || '';
    this.age = data.age || 0;
    this.address = data.address || '';
    this.dob = data.dob || new Date();
    this.job = data.job || '';
    this.salary = data.salary || 0;
  }
}
