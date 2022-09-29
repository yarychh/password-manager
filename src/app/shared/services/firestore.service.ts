import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, first, Observable, of } from 'rxjs';
import { IPassPair } from '../interfaces/passPair.interface';
import { IUser } from '../interfaces/user.interface';
import { SetPairsAction } from '../state/keychain.actions';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private pairs$ = new BehaviorSubject<IPassPair[]>([]);
  private currentEmail!: string;

  constructor(
    private _firestore: AngularFirestore,
    private toastr: ToastrService,
    private _store: Store
  ) {
    this.currentEmail = this.getEmail();
  }

  private getEmail(): string {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString?.length) {
      const currentUser = JSON.parse(currentUserString) as IUser;
      return currentUser.email.toLocaleLowerCase();
    } else {
      return '';
    }
  }

  public getPairs(): void {
    this._firestore
      .collection('users')
      .doc(this.currentEmail)
      .valueChanges()
      .pipe(
        first(),
        catchError(err => {
          this.toastr.error(err.message);
          return of(null)
        })
      )
      .subscribe((user) => {
        const pairs = (user as IUser)?.pairs ?? [];
        this.pairs$.next(pairs);
        this._store.dispatch(new SetPairsAction(pairs));
      });
  }

  public addPair(pair: IPassPair): Promise<void> {
    if (!this.currentEmail.length) {
      this.toastr.error('Adding pair failed!');
    }
    return this._firestore
      .collection('users')
      .doc(this.currentEmail)
      .update({
        pairs: [...this.pairs$.getValue(), pair],
      });
  }

  public removePair(id: number): Promise<void> {
    // mock
    return new Promise((res, rej) => {
      res()
    });

    // if (!this.currentEmail.length) {
    //   this.toastr.error('Pair removal failed!');
    // }
    // return this._firestore
    //   .collection('users')
    //   .doc(this.currentEmail)
    //   .update({
    //     pairs: this.pairs$.getValue().filter((pair) => pair.id !== id),
    //   });
  }

  public updatePair(
    login: string,
    password: string,
    id: number
  ): Promise<void> {
    // mock
    return new Promise((res, rej) => {
      res()
    });


    // if (!this.currentEmail.length) {
    //   this.toastr.error('Update failed!');
    // }
    // return this._firestore
    //   .collection('users')
    //   .doc(this.currentEmail)
    //   .update({
    //     pairs: [
    //       ...this.pairs$.getValue().filter((pair) => pair.id !== id),
    //       {
    //         ...this.pairs$.getValue().find((pair) => pair.id === id),
    //         login,
    //         password,
    //       },
    //     ],
    //   });
  }
}
