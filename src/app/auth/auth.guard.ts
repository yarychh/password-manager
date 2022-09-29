import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { IUser } from '../shared/interfaces/user.interface';
import { Auth2Service } from './auth2.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _auth2Service: Auth2Service,
    private _fireAuth: AngularFireAuth
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      if (this.getCurrentUser() && this._auth2Service.getIsLogedIn()) {
        resolve(true);
      } else {
        this._router.navigate(['/auth/login']);
        resolve(false);
      }
    });
  }

  private getCurrentUser(): IUser | boolean {
    const stringUser = localStorage.getItem('currentUser');
    if (stringUser?.length) {
      const parsedUser = JSON.parse(stringUser) as IUser;
      return parsedUser.id ? parsedUser : false;
    } else {
      return false;
    }
  }

  // with firebase

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return new Promise<boolean>((resolve, reject) => {
  //     this._fireAuth.onAuthStateChanged((user) => {
  //       if (user) {
  //         resolve(true);
  //       } else {
  //         this._router.navigate(['/auth/login']);
  //         resolve(false);
  //       }
  //     });
  //   });
  // }
}
