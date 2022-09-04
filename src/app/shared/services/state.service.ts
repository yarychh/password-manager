import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IPassPair {
  login: string;
  password: string;
  source: string;
  shown: boolean;
  id: number;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pairs: IPassPair[];
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private pairs$ = new BehaviorSubject<IPassPair[]>([]);

  constructor() {}

  public getPairs(): Observable<IPassPair[]> {
    return this.pairs$;
  }

  public init(id: number): void {
    const usersString = this.getUsers();
    if (usersString?.length) {
      const users = JSON.parse(usersString);
      const user = users.find((user: IUser) => user.id === id);
      this.pairs$.next(user.pairs);
    } else {
      console.log('no users in localStorage');
    }
  }

  public addUser(user: IUser): void {
    const usersString = this.getUsers();
    if (usersString?.length) {
      const users = JSON.parse(usersString);
      const newUsers = [...users, user];
      localStorage.setItem('users', JSON.stringify(newUsers));
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.pairs$.next(user.pairs);
    } else {
      localStorage.setItem('users', JSON.stringify([user]));
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  public getUsers(): string | null {
    const users = localStorage.getItem('users');
    return users?.length ? users : null;
  }

  public addPassPair(pair: IPassPair) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser?.length) {
      const parsed: IUser = JSON.parse(currentUser);
      parsed.pairs.push(pair);

      const users = this.getUsers();
      if (users?.length) {
        const newUsers = JSON.parse(users).filter(
          (user: IUser) => {
            return user.id !== parsed.id
          }
        );
        localStorage.setItem('users', JSON.stringify([...newUsers, parsed]));
      }

      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(parsed));
      this.init(parsed.id);
    }
  }

  public removePair(id: number): void{
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser?.length) {
      const parsed: IUser = JSON.parse(currentUser);
      const users = this.getUsers();

      parsed.pairs = parsed.pairs.filter(pair => {
        console.log(pair.id, 'pair.id');
        console.log(id, 'id');
        return pair.id !== id;
      })

      if (users?.length) {
        const newUsers = JSON.parse(users).filter(
          (user: IUser) => {
            return user.id !== parsed.id
          }
        );
        localStorage.setItem('users', JSON.stringify([...newUsers, parsed]));
      }

      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(parsed));
      this.init(parsed.id);
    }
  }

  public toggleShowPair(id: number): void{
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser?.length) {
      const parsed: IUser = JSON.parse(currentUser);
      const users = this.getUsers();

      parsed.pairs = parsed.pairs.map(pair => {
        if (pair.id === id) {
          pair.shown = !pair.shown;
        }
        return pair;
      });

      if (users?.length) {
        const newUsers = JSON.parse(users).filter(
          (user: IUser) => {
            return user.id !== parsed.id
          }
        );
        localStorage.setItem('users', JSON.stringify([...newUsers, parsed]));
      }

      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(parsed));
      this.init(parsed.id);
    }
  }

  public editPair(login: string, password: string, id: number): void{
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser?.length) {
      const parsed: IUser = JSON.parse(currentUser);
      const users = this.getUsers();

      parsed.pairs = parsed.pairs.map(pair => {
        if (pair.id === id) {
          pair.login = login;
          pair.password = password;
        }
        return pair;
      });

      if (users?.length) {
        const newUsers = JSON.parse(users).filter(
          (user: IUser) => {
            return user.id !== parsed.id
          }
        );
        localStorage.setItem('users', JSON.stringify([...newUsers, parsed]));
      }

      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(parsed));
      this.init(parsed.id);
    }
  }
}
