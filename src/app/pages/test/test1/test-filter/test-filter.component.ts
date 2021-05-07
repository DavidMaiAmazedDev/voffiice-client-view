import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { Filter } from '../../../../core/interfaces/test.dataRequest.interface';
import { TestModel, TestSearchModel } from '../../../../core/models/test-model';

@Component({
  selector: 'app-test-filter',
  templateUrl: './test-filter.component.html',
  styleUrls: ['./test-filter.component.scss'],
})
export class TestFilterComponent implements OnInit {
  private searchOption: Filter[];
  constructor(private fb: FormBuilder) {
    const { required, maxLength, minLength, email, mobile } = MyValidators;
    this.validateForm = this.fb.group({
      userName: ['', [required, maxLength(12), minLength(6)], [this.userNameAsyncValidator]],
      mobile: ['', [required, mobile]],
      email: ['', [required, email]],
      password: ['', [required]],
      confirm: ['', [this.confirmValidator]],
    });
  }
  @Output() searchRequest = new EventEmitter<TestSearchModel>();
  @Output() hide = new EventEmitter();
  @Input() valueFilter: TestSearchModel;
  value = '';
  title = 'Input a number';
  date;
  searchName;
  searchAge;
  searchJob;
  searchSalary;
  searchAddress;
  searchDob;

  @ViewChild('inputAge', { static: false }) inputAge?: ElementRef;
  @ViewChild('inputSalary', { static: false }) inputSalary?: ElementRef;
  // @Input() X: number;
  // @Input() Y: number;
  // @Input() width: number;
  // @Output() hideFilterModal = new EventEmitter();
  validateForm: FormGroup;
  listMenu = ['done', 'raw', 'complete', 'hybird'];

  ngOnInit(): void {
    this.setInitValue();
    this.getCurrentMenu(this.listMenu[0]);
  }

  private setInitValue() {
    this.searchAge = null;
    this.searchName = '';
    this.searchJob = '';
    this.searchSalary = null;
    this.searchAddress = '';
    this.searchDob = null;
    // this.searchOption = [{},{},{},{}];
  }

  log(e) {
    // console.log(e);
  }

  // hide() {
  //   this.hideFilterModal.emit();
  // }

  getCurrentMenu(item: string) {
    switch (item) {
      case this.listMenu[0]:
        this.valueFilter.name = 'messi';
        break;
      case this.listMenu[1]:
        this.valueFilter.age = 20;
        break;
      case this.listMenu[2]:
        this.valueFilter.dob = new Date();
        break;
      case this.listMenu[3]:
        this.valueFilter.job = 'doctor';
        break;
    }
  }

  onChangeAge(value: string): void {
    this.updateAgeValue(value);
  }

  onChangeSalary(value: string): void {
    this.updateSalaryValue(value);
  }

  search() {
    // let searchRequest: TestSearchModel = null;
    // const age = this.searchAge;
    // const name = this.searchName;
    // const job = this.searchJob;
    // const salary = this.searchSalary;
    // const address = this.searchAddress;
    // const dob = this.searchDob;
    // searchRequest = {age, name, job, salary, address, dob};
    this.searchRequest.emit(this.valueFilter);
    // console.log(name, age, this.searchName, this.searchDob);
  }
  close() {
    this.hide.emit();
  }

  // '.' at the end or only '-' in the input box.
  onBlurAge(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateAgeValue(this.value.slice(0, -1));
    }
  }

  onBlurSalary(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateSalaryValue(this.value.slice(0, -1));
    }
  }

  updateAgeValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputAge!.nativeElement.value = this.value;
    this.updateTitle();
  }

  updateSalaryValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputSalary!.nativeElement.value = this.value;
    this.updateTitle();
  }
  updateTitle(): void {
    this.title = (this.value !== '-' ? this.formatNumber(this.value) : '-') || 'Input a number';
  }

  formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: {
              'zh-cn': `用户名已存在`,
              en: `The username is redundant!`,
            },
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `MinLength is ${minLength}`,
        },
      };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `MaxLength is ${maxLength}`,
        },
      };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : {
          mobile: {
            'zh-cn': `手机号码格式不正确`,
            en: `Mobile phone number is not valid`,
          },
        };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
