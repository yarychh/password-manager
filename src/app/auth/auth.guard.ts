import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _authService: AuthService) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this._authService.currentUserValue;
    // //const accessToken = localStorage.getItem('access-token');

    // if (this._authService.isSignIn()) {
    //   // check if route is restricted by role
    //   if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
    //     // role not authorised so redirect to not-authorized page
    //     this._router.navigate(['/pages/miscellaneous/not-authorized']);
    //     return false;
    //   }

    //   // authorised so return true
    //   return true;
    // }

    // // not logged in so redirect to login page with the return url
    this._router.navigate(['/']);
    return false;
  }
}
