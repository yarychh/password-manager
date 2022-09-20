import { IPassPair } from "../interfaces/passPair.interface";

export class SetPairsAction {
  static readonly type = '[Keychain] Set Pairs';
  constructor(public pairs: IPassPair[]) { }
}

export class ToggleShownAction {
  static readonly type = '[Keychain] Toggle Shown';
  constructor(public id: number) { }
}
