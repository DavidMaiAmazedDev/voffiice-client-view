import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { TestRoutingModule } from './test-routing.module';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedPipesModule } from '../../core/pipes/shared-pipes.module';
import { TestFilterComponent } from './test1/test-filter/test-filter.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { TestAddNewModalComponent } from './test1/test-add-new-modal/test-add-new-modal.component';
import { TestViewOptionColumnComponent } from './test2/test-view-option-column/test-view-option-column.component';
import { TestFilterModalComponent } from './test2/test-filter-modal/test-filter-modal.component';
import { Test2AddNewModalComponent } from './test2/test2-add-new-modal/test2-add-new-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Test1Component,
    Test2Component,
    TestFilterComponent,
    TestAddNewModalComponent,
    TestViewOptionColumnComponent,
    TestFilterModalComponent,
    Test2AddNewModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    ClickOutsideModule,
    TestRoutingModule,
    NgbDropdownModule,
    SharedModule,
    SharedPipesModule,
    TranslateModule,
  ],
})
export class TestModule {}
