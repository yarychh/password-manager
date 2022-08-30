import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor() { }

  public login(): any{
    this.isLoggedIn$.next(true);
  }
  public logout(): any{
    this.isLoggedIn$.next(false);
  }
}
