import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SystemUserComponent} from './system-user/system-user.component';
import {SystemConfigurationComponent} from './system-configuration/system-configuration.component';

const routes: Routes = [
  {
    path: 'user',
    component: SystemUserComponent
  },
  {
    path: 'config',
    component: SystemConfigurationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
