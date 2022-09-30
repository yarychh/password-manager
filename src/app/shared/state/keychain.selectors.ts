import { Selector } from '@ngxs/store';
import { IPassPair } from '../interfaces/passPair.interface';
import { KeyChainState, KeyChainStateModel } from './keychain.state';

export class KeychainSelectors {
  @Selector([KeyChainState])
  static pairs(state: KeyChainStateModel): IPassPair[] {
    return state.PassPairs;
  }

  @Selector([KeyChainState])
  static sortedPairs(state: KeyChainStateModel): Array<IPassPair[]>{
    const userCategories = [
      ...new Set(state.PassPairs.map((pair) => pair.category)),
    ];
    let sorted: Array<IPassPair[]> = userCategories.map((category) => {
      return state.PassPairs.filter((pair) => pair.category === category);
    });
    console.log(sorted);
    return sorted;
  }
}
