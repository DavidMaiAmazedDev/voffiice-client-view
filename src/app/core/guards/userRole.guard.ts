import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class UserRoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.currentUser();
    console.log(route);
    console.log(user);

    if (
      user &&
      route.data &&
      route.data.roles &&
      route.data.roles.includes(user.role)
    ) {
      return true;
    } else {
      console.log('you have no permission to access this page!!!');
      return false;
    }
  }
}
