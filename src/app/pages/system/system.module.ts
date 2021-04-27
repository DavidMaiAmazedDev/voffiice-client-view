import {NgModule} from '@angular/core';
import {SystemUserComponent} from './system-user/system-user.component';
import {SystemConfigurationComponent} from './system-configuration/system-configuration.component';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SystemRoutingModule} from './system-routing.module';

@NgModule({
  declarations: [ SystemUserComponent, SystemConfigurationComponent],
  imports: [
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
