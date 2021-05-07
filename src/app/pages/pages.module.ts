import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {
  NgbNavModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { TestModule } from './test/test.module';
import { PrivatePageComponent } from './private-page/private-page.component';
import { SystemModule } from './system/system.module';

@NgModule({
  declarations: [FilemanagerComponent, PrivatePageComponent],
  imports: [
    TestModule,
    SystemModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbNavModule,
    NgbTooltipModule,
    PerfectScrollbarModule,
  ],
})
export class PagesModule {}
