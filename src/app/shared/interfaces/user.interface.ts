import { IPassPair } from './passPair.interface';

export interface IUser {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pairs?: IPassPair[];
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IRegisteredUserResponse {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  __v: number;
  _id: string;
}
