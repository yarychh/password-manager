import { IPassPair } from "./passPair.interface";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pairs: IPassPair[];
}
