import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth.models';
import {MenuVerticalItem} from '../models/menu-vertical.model';
import {MenuHorizontalItem} from '../models/menu-horizontal.model';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
    getHorizontalMenu(): MenuHorizontalItem[] {
      return [
        {
          id: 1,
          label: 'System',
          icon: 'bx-home-circle',
          subItems: [
            {
              id: 2,
              label: 'User',
              link: '/user',
              parentId: 1
            },
            {
              id: 3,
              label: 'Configuration',
              link: '/config',
              parentId: 1
            },
          ]
        },
        // {
        //   id: 4,
        //   label: 'MENUITEMS.DASHBOARDS.TEXT',
        //   icon: 'bx-home-circle',
        //   subItems: [
        //     {
        //       id: 5,
        //       label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
        //       link: '/dashboard',
        //       parentId: 4
        //     },
        //   ]
        // },
        {
          id: 12,
          label: 'private Page',
          icon: 'bx-file',
          link: '/privatepage',
        },
        {
          id: 121,
          label: 'Test',
          icon: 'bx-file',
          subItems: [{
            id: 122,
            label: 'Test1',
            link: '/test/test1',
            parentId: 121
          }, {
            id: 123,
            label: 'Test2',
            link: '/test/test2',
            parentId: 121
          }
          ]
        }
      ];
    }
    getVerticalMenu(): MenuVerticalItem[] {
      return [
        // {
        //   id: 1,
        //   label: 'MENUITEMS.MENU.TEXT',
        //   isTitle: true
        // },
        {
          id: 1,
          label: 'System',
          icon: 'bx-home-circle',
          subItems: [
            {
              id: 2,
              label: 'User',
              link: '/user',
              parentId: 1
            },
            {
              id: 3,
              label: 'Configuration',
              link: '/config',
              parentId: 1
            },
          ]
        },
        // {
        //   id: 4,
        //   label: 'MENUITEMS.DASHBOARDS.TEXT',
        //   icon: 'bx-home-circle',
        //   badge: {
        //     variant: 'info',
        //     text: 'MENUITEMS.DASHBOARDS.BADGE',
        //   },
        //   subItems: [
        //     {
        //       id: 5,
        //       label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
        //       link: '/dashboard',
        //       parentId: 4
        //     },
        //   ]
        // },
        // {
        //   id: 7,
        //   isLayout: true
        // },
        {
          id: 11,
          label: 'MENUITEMS.FILEMANAGER.TEXT',
          icon: 'bx-file',
          link: '/filemanager',
          badge: {
            variant: 'success',
            text: 'MENUITEMS.FILEMANAGER.BADGE',
          },
        },
        {
          id: 12,
          label: 'private Page',
          icon: 'bx-file',
          link: '/privatepage',
        },
        // {
        //   id: 56,
        //   label: 'MENUITEMS.PAGES.TEXT',
        //   isTitle: true
        // },
        {
          id: 121,
          label: 'Test',
          icon: 'bx-file',
          link: '/test',
          subItems: [{
            id: 122,
            label: 'Test1',
            link: '/test/test1',
            parentId: 121
          }, {
            id: 123,
            label: 'Test2',
            link: '/test/test2',
            parentId: 121
          }
          ]
        }
      ];
    }
}
