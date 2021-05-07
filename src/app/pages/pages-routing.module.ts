import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilemanagerComponent } from './filemanager/filemanager.component';
import { PrivatePageComponent } from './private-page/private-page.component';
import { UserRoleGuard } from '../core/guards/userRole.guard';
import { userRole } from '../core/helpers/utils';

const routes: Routes = [
  { path: '', redirectTo: 'filemanager' },
  { path: 'filemanager', component: FilemanagerComponent },
  {
    path: 'privatepage',
    component: PrivatePageComponent,
    canActivate: [UserRoleGuard],
    data: { roles: [userRole.Admin, userRole.User] },
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then((m) => m.TestModule),
  },
  {
    path: 'system',
    loadChildren: () => import('./system/system.module').then((m) => m.SystemModule),
  },
  {
    path: '**',
    redirectTo: 'pageNotFound',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
