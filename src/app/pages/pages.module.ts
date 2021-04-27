import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';


import { FullCalendarModule } from '@fullcalendar/angular';

import { PagesRoutingModule } from './pages-routing.module';


import { HttpClientModule } from '@angular/common/http';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import {TestModule} from './test/test.module';
import {SharedModule} from '../shared/shared.module';
import { PrivatePageComponent } from './private-page/private-page.component';
import {SystemModule} from './system/system.module';
import {NotifierModule} from 'angular-notifier';
import {CUSTOM_NOTIFIER_OPTIONS} from '../core/helpers/utils';



@NgModule({
  declarations: [FilemanagerComponent, PrivatePageComponent ],
  imports: [
    TestModule,
    SystemModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    PerfectScrollbarModule,
  ]
})
export class PagesModule { }
