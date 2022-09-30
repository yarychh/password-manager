export interface IPassPair {
  login: string;
  password: string;
  source: string;
  shown: boolean;
  id: string;
  category: string;
  // with firebase
  // id: number;
  userId: string;
}

export interface IPassPairResponce {
  _id: string;
  userId: string;
  login: string;
  password: string;
  source: string;
  category: string;
  shown: boolean;
}
