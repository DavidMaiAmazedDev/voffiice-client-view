import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';

import { UIModule } from './ui/ui.module';
import {NotifierModule} from 'angular-notifier';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {LoaderService} from '../core/services/loader.service';
import {CopierService} from '../core/services/copier.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoaderInterceptorService} from '../core/helpers/loader-interceptor.service';
import {en_US, NZ_I18N, vi_VN} from 'ng-zorro-antd/i18n';
import {NgZorroAntdModule} from './ng-zorror-antd.module';
import {CUSTOM_NOTIFIER_OPTIONS} from '../core/helpers/utils';
import {NgPrimeModule} from './ng-prime.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};

// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   interactionPlugin,
//   bootstrapPlugin
// ]);

// registerLocaleData(en);
//
// const antDesignIcons = AllIcons as {
//   [key: string]: IconDefinition;
// };
// const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UIModule,
    NgZorroAntdModule,
    NgPrimeModule,
    NotifierModule.withConfig(CUSTOM_NOTIFIER_OPTIONS)
  ],
  exports: [
    CommonModule,
    UIModule,
    NgZorroAntdModule,
    NgPrimeModule,
    NotifierModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: NZ_I18N, useValue: en_US }
    // { provide: NZ_I18N, useValue: vi_VN }
    // { provide: NZ_ICONS, useValue: icons }
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [ LoaderService, DatePipe ]
    };
  }

  // static forChild(testConfig: TestInterface): ModuleWithProviders<any> {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [ CopierService, {
  //       provide: 'INTERVAL',
  //       useValue: testConfig.age
  //     } ]
  //   };
  // }
}
