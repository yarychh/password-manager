import { Selector } from '@ngxs/store';
import { IPassPair } from '../interfaces/passPair.interface';
import { KeyChainState, KeyChainStateModel } from './keychain.state';

export class KeychainSelectors {
  @Selector([KeyChainState])
  static pairs(state: KeyChainStateModel): IPassPair[] {
    return state.PassPairs;
  }
}
