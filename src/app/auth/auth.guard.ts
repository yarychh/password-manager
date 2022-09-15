import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _fireAuth: AngularFireAuth
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      this._fireAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          this._router.navigate(['/auth/login']);
          resolve(false);
        }
      });
    });
  }
}
