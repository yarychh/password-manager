import { Injectable } from '@angular/core';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, first, map } from 'rxjs';
import { IProfile } from '../shared/interfaces/profile.interface';
import { IUser } from '../shared/interfaces/user.interface';
import { AddPasswordComponent } from './add-password/add-password.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private _fireAuth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this._fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn$.next(true);
      } else {
        this.isLoggedIn$.next(false);
      }
    });
  }

  public getIsLogedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  public login(email: string, password: string): Promise<any> {
    return this._fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this._firestore
          .collection('users')
          .doc(email.toLocaleLowerCase())
          .valueChanges()
          .pipe(first())
          .subscribe((resp) => {
            localStorage.setItem('currentUser', JSON.stringify(resp));
            console.log('login success');
            this.router.navigate(['keychain']);
          });
      })
      .catch((err) => {
        this.toastr.error(err.message);
        console.log('login failed');
        console.error(err);
        if (err.code) {
          return { isValid: false, message: err.message };
        }
      });
  }

  public register(user: IUser): Promise<any> {
    return this._fireAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        let emailLowercased = user.email.toLocaleLowerCase();
        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          emailLowercased,
          pairs: user.pairs,
          password: user.password,
        };

        this._firestore.doc('/users/' + emailLowercased).set({ ...userData });

        this.login(user.email, user.password);
      })
      .catch((err) => {
        this.toastr.error(err.message);
        console.log('register failed');
        console.error(err);
        if (err.code) {
          return { isValid: false, message: err.message };
        }
      });
  }

  public logout(): Promise<void> {
    return this._fireAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('currentUser');
        this.isLoggedIn$.next(false);
        this.router.navigate(['/auth/login']);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }

  public GoogleAuth(): void {
    this._fireAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        if (result.additionalUserInfo?.isNewUser) {
          this.dialog
            .open(AddPasswordComponent, { width: '500px' })
            .afterClosed()
            .pipe(first())
            .subscribe((res) => {
              const profile = result.additionalUserInfo?.profile as IProfile;
              const userData = {
                id: Date.now(),
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                emailLowercased: profile.email.toLowerCase(),
                pairs: [],
                password: res.password,
              };
              this._firestore
                .doc('/users/' + profile.email.toLowerCase())
                .set({ ...userData })
                .then(() => {
                  localStorage.setItem('currentUser', JSON.stringify(userData));
                  this.router.navigate(['keychain']);
                  this.toastr.success('Account created successfully');
                });
            });
        } else {
          this._firestore
            .collection('users')
            .doc((result.additionalUserInfo?.profile as IProfile).email)
            .valueChanges()
            .pipe(
              first(),
              map((user) => user as IUser)
            )
            .subscribe((user: IUser) => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.router.navigate(['keychain']);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
