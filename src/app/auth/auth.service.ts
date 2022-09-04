import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUser, StateService } from '../shared/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private router: Router, private state: StateService) { }

  public getIsLogedIn(): boolean{
    return this.isLoggedIn$.getValue();
  }

  public login(email: string, password: string): void{
    const users = this.state.getUsers();
    if (users?.length) {
      const user = JSON.parse(users).find((user: IUser) => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.isLoggedIn$.next(true);
        this.router.navigate(['keychain']);
        this.state.init(user.id);
      } else {
        window.alert('Wrong credentials!')
      }
    } else {
      this.router.navigate(['auth', 'register'])
    }
  }

  public logout(): void{
    localStorage.removeItem('currentUser')
    this.isLoggedIn$.next(false);
    this.router.navigate(['/auth/login']);
  }
}
