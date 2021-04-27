import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {TestModel} from '../../../../core/models/test-model';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {CustomValidationService} from '../../../../core/services/customValidation.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-test2-add-new-modal',
  templateUrl: './test2-add-new-modal.component.html',
  styleUrls: ['./test2-add-new-modal.component.scss']
})

export class Test2AddNewModalComponent implements OnInit {
  validateForm: FormGroup;
  @Input() testDataElement: TestModel;
  @Input() isEdit: boolean;
  @Output() newData = new EventEmitter<TestModel>();
  @Input() isShowAddNewModal: boolean;
  @Output() hide = new EventEmitter();
  isSubmit = false;
  constructor(private fb: FormBuilder, private customValidator: CustomValidationService, private datePipe: DatePipe) {

    // const {required, maxLength, minLength, age } = MyValidators;
    this.validateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.max(50)]],
      age: ['', [Validators.required, this.customValidator.numberValidator(), Validators.min(10), Validators.max(100)]],
      address: ['', [Validators.required]],
      dob: ['', [Validators.required, this.customValidator.dateValidator()]],
      job: ['', [Validators.required]],
      salary: ['', [Validators.required, this.customValidator.numberValidator(), Validators.min(100), Validators.max(10000)]]
    });
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.hide.emit();
  }

  ngOnInit(): void {
    this.setFormData(this.testDataElement);
  }

  get f() {
    return this.validateForm.controls;
  }

  setFormData(data: TestModel) {
    if (data !== null){
      // data.dob = new Date(data.dob);
      // console.log(this.validateForm);
      this.validateForm.patchValue(data);
      this.validateForm.get('dob').setValue(new Date(data.dob));
    }
  }

  close() {
    this.hide.emit();
  }

  submit() {
    this.isSubmit = true;
    console.log(this.testDataElement);
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    // console.log(this.validateForm);
    if (this.validateForm.status === 'INVALID') {
      return;
    }
    this.newData.emit(this.validateForm.value);
  }

}

// export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
// export type MyValidationErrors = Record<string, MyErrorsOptions>;
//
// export class MyValidators extends Validators {
//   static minLength(minLength: number): ValidatorFn {
//     return (control: AbstractControl): MyValidationErrors | null => {
//       if (Validators.minLength(minLength)(control) === null) {
//         return null;
//       }
//       return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
//     };
//   }
//
//   static maxLength(maxLength: number): ValidatorFn {
//     return (control: AbstractControl): MyValidationErrors | null => {
//       if (Validators.maxLength(maxLength)(control) === null) {
//         return null;
//       }
//       return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
//     };
//   }
//
//   static mobile(control: AbstractControl): MyValidationErrors | null {
//     const value = control.value;
//
//     if (isEmptyInputValue(value)) {
//       return null;
//     }
//
//     return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
//   }
//
//   static age(control: AbstractControl): MyValidationErrors | null {
//     const value = control.value;
//
//     if (isEmptyInputValue(value)) {
//       return null;
//     }
//
//     return isAge(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Age is not valid` } };
//   }
// }
//
// function isEmptyInputValue(value: NzSafeAny): boolean {
//   return value == null || value.length === 0;
// }
//
// function isMobile(value: string): boolean {
//   return typeof value === 'string' && /(^1\d{10}$)/.test(value);
// }
//
// function isAge(value: string): boolean {
//   return typeof value === 'string' && /(^1\d{10}$)/.test(value);
// }


