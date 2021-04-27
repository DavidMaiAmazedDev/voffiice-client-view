import {BaseRequestInterface} from './base-request.interface';

export interface Sort {
  field: string;
  asc: boolean;
}

export interface Filter {
  key: string;
  value: any;
}


export interface TestDataRequestInterface extends BaseRequestInterface{
  sort: Sort;
  filter: Filter[];
  overall: string;
}
