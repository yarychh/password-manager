import { Injectable } from '@angular/core';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import {
  IRegisterUser,
  IUser,
} from '../shared/interfaces/user.interface';
import { ApiService } from '../shared/services/api.service';
import { AddPasswordComponent } from './add-password/add-password.component';

@Injectable({
  providedIn: 'root',
})
export class Auth2Service {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public UserId: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  public getIsLogedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  public login(email: string, password: string): any {
    this.api
      .login(email, password)
      .pipe(first())
      .subscribe((resp) => {
        const user: IUser = {
          id: resp._id,
          firstName: resp.firstName,
          lastName: resp.lastName,
          email: resp.email,
          password: resp.password,
        };
        localStorage.setItem('currentUser',JSON.stringify(user));
        this.isLoggedIn$.next(true);
        this.router.navigate(['keychain']);
      });
  }

  public register(user: IRegisterUser): void {
    this.api
      .register(user)
      .pipe(first())
      .subscribe((resp) => {
        this.login(resp.email, resp.password);
      });
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedIn$.next(false);
    this.router.navigate(['/auth/login']);
  }

  public GoogleAuth(): void {
    // this._fireAuth
    //   .signInWithPopup(new GoogleAuthProvider())
    //   .then((result) => {
    //     if (result.additionalUserInfo?.isNewUser) {
    //       this.dialog
    //         .open(AddPasswordComponent, { width: '500px' })
    //         .afterClosed()
    //         .pipe(first())
    //         .subscribe((res) => {
    //           const profile = result.additionalUserInfo?.profile as IProfile;
    //           const userData = {
    //             id: Date.now(),
    //             firstName: profile.given_name,
    //             lastName: profile.family_name,
    //             email: profile.email,
    //             emailLowercased: profile.email.toLowerCase(),
    //             pairs: [],
    //             password: res.password,
    //           };
    //           this._firestore
    //             .doc('/users/' + profile.email.toLowerCase())
    //             .set({ ...userData })
    //             .then(() => {
    //               localStorage.setItem('currentUser', JSON.stringify(userData));
    //               this.router.navigate(['keychain']);
    //               this.toastr.success('Account created successfully');
    //             });
    //         });
    //     } else {
    //       this._firestore
    //         .collection('users')
    //         .doc((result.additionalUserInfo?.profile as IProfile).email)
    //         .valueChanges()
    //         .pipe(
    //           first(),
    //           map((user) => user as IUser)
    //         )
    //         .subscribe((user: IUser) => {
    //           localStorage.setItem('currentUser', JSON.stringify(user));
    //           this.router.navigate(['keychain']);
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}
