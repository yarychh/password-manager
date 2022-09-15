import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, first } from 'rxjs';
import { IUser } from '../shared/constants/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private _fireAuth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private toastr: ToastrService
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
        this._firestore.collection('users')
        .doc(email.toLocaleLowerCase())
        .valueChanges()
        .pipe(first())
        .subscribe(resp => {
          localStorage.setItem('currentUser', JSON.stringify(resp))
        })
        console.log('login success');
        this.router.navigate(['keychain']);
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
      .then((res) => {
        let emailLowercased = user.email.toLocaleLowerCase();
        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          emailLowercased,
          pairs: user.pairs,
          password: user.password,
        }

        this._firestore
          .doc('/users/' + emailLowercased)
          .set({ ...userData });

        this.login(user.email, user.password);
      })
      .catch(err => {
        this.toastr.error(err.message);
        console.log('register failed');
        console.error(err)
        if (err.code) {
          return { isValid: false, message: err.message };
        }
      })
  }

  public logout(): Promise<void> {
    return this._fireAuth.signOut()
      .then(() => {
        localStorage.removeItem('currentUser');
        this.isLoggedIn$.next(false);
        this.router.navigate(['/auth/login']);
      })
      .catch(err => {
        console.error(err);
        return err;
      })
  }

  public GoogleAuth(): void {
    this._fireAuth.signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        console.log('You have been successfully logged in!', result);
        
    })
    .catch((error) => {
      console.log(error);
    });
  }

}
