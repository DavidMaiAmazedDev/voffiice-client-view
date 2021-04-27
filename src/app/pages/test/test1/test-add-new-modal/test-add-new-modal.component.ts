import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TestModel} from '../../../../core/models/test-model';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {NzSafeAny} from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-test-add-new-modal',
  templateUrl: './test-add-new-modal.component.html',
  styleUrls: ['./test-add-new-modal.component.scss']
})
export class TestAddNewModalComponent implements OnInit {

  @Input() testDataElement: TestModel;
  @Input() isAddNew: boolean;
  @Input() isEdit: boolean;
  @Output() hide = new EventEmitter();
  @Output() newData = new EventEmitter<TestModel>();

  validateForm: FormGroup;

  // current locale is key of the nzAutoTips
  // if it is not found, it will be searched again with `default`
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: '邮箱格式不正确/The input is not valid email'
    }
  };
  constructor(private fb: FormBuilder) {
    const {required, maxLength, minLength, age } = MyValidators;
    this.validateForm = this.fb.group({
      name: ['', [required, maxLength(50), minLength(6)]],
      age: ['', [required, age]],
      address: ['', [required]],
      dob: [null, [required]],
      job: ['', [required]],
      salary: ['', [required]]
    });
  }

  ngOnInit(): void {
    // console.log(this.testDataElement);
    this.setFormData(this.testDataElement);
  }

  close() {
    this.hide.emit();
  }

  setFormData(data: TestModel) {
    if (data !== null){
      this.validateForm.patchValue(data);
    }
  }

  submit() {
    console.log(this.testDataElement);
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    // console.log(this.validateForm);
    if (this.validateForm.status === 'INVALID') {
      return;
    }
    console.log(this.validateForm);
    this.newData.emit(this.validateForm.value);
    // console.log(value);
    // console.log(this.testDataElement);
  }

  submitForm(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: { 'zh-cn': `用户名已存在`, en: `The username is redundant!` }
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    })

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

}

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }

  static age(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isAge(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Age is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}

function isAge(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}

