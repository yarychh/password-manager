import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, first, Observable, of, tap } from 'rxjs';
import { IPassPair, IPassPairResponce } from '../interfaces/passPair.interface';
import {
  IRegisteredUserResponse,
  IRegisterUser,
} from '../interfaces/user.interface';
import { SetPairsAction } from '../state/keychain.actions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public userId = '';
  private apiUrl: string = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private _store: Store
  ) {}

  public login(
    email: string,
    password: string
  ): Observable<IRegisteredUserResponse> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) =>
        !!user ? (this.userId = (user as IRegisteredUserResponse)._id) : null
      ),
      catchError((err) => {
        this.toastr.error(err.message);
        console.error(err.message, err);
        return of(null);
      }),
      filter((resp) => !!resp)
    ) as Observable<IRegisteredUserResponse>;
  }

  public register(user: IRegisterUser): Observable<IRegisteredUserResponse> {
    return this.http.post(`${this.apiUrl}/register`, { ...user }).pipe(
      catchError((err) => {
        this.toastr.error(err.message);
        console.error(err.message, err);
        return of(null);
      }),
      filter((resp) => !!resp)
    ) as Observable<IRegisteredUserResponse>;
  }

  public getPairs(): void {
    this.http
      .get(`${this.apiUrl}/pairs/${this.userId}`)
      .pipe(
        catchError((err) => {
          this.toastr.error(err.message);
          console.error(err.message, err);
          return of(null);
        }),
        filter((resp) => !!resp),
        first()
      )
      .subscribe((resp) => {
        const pairs = (resp as []).map((pair) => {
          const { _id, login, password, shown, source, userId } =
            pair as IPassPairResponce;
          return {
            id: _id,
            login,
            password,
            shown,
            source,
            userId,
          } as IPassPair;
        });
        this._store.dispatch(new SetPairsAction(pairs));
      });
  }

  public addPair(pair: {
    source: string;
    login: string;
    password: string;
    shown: boolean;
  }): void {
    this.http
      .post(`${this.apiUrl}/pairs`, {
        ...pair,
        userId: this.userId,
      })
      .pipe(
        catchError((err) => {
          this.toastr.error(err.message);
          console.error(err.message, err);
          return of(null);
        }),
        filter((resp) => !!resp),
        first()
      )
      .subscribe();
  }

  public removePair(id: string): void {
    this.http
      .delete(`${this.apiUrl}/pairs/${id}`)
      .pipe(
        catchError((err) => {
          this.toastr.error(err.message);
          console.error(err.message, err);
          return of(null);
        }),
        filter((resp) => !!resp),
        first()
      )
      .subscribe();
  }

  public editPair(pair: IPassPair): void {
    this.http
      .put(`${this.apiUrl}/pairs/${pair.id}`, {
        userId: pair.userId,
        login: pair.login,
        password: pair.password,
        source: pair.source,
        shown: pair.shown,
      })
      .pipe(
        catchError((err) => {
          this.toastr.error(err.message);
          console.error(err.message, err);
          return of(null);
        }),
        filter((resp) => !!resp),
        first()
      )
      .subscribe();
  }
}
