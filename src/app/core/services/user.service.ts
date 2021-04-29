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
      return null;
    }
    getVerticalMenu(): MenuVerticalItem[] {
      return [
        {
          id: 1,
          label: 'system',
          icon: 'bx-home-circle',
          subItems: [
            {
              id: 2,
              label: 'user',
              link: '/user',
              parentId: 1
            },
            {
              id: 3,
              label: 'configuration',
              link: '/config',
              parentId: 1
            },
          ]
        },
        {
          id: 11,
          label: 'filemanager',
          icon: 'bx-file',
          link: '/filemanager',
          badge: {
            variant: 'success',
            text: 'new',
          },
        },
        {
          id: 12,
          label: 'private',
          icon: 'bx-file',
          link: '/privatepage',
        },
        {
          id: 121,
          label: 'test',
          icon: 'bx-file',
          link: '/test',
          subItems: [{
            id: 122,
            label: 'test1',
            link: '/test/test1',
            parentId: 121
          }, {
            id: 123,
            label: 'test2',
            link: '/test/test2',
            parentId: 121
          }
          ]
        }
      ];
    }
}
