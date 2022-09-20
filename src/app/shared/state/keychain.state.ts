import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { IPassPair } from "../interfaces/passPair.interface";
import { SetPairsAction, ToggleShownAction } from "./keychain.actions";

export interface KeyChainStateModel{
  PassPairs: IPassPair[]
}

@State<KeyChainStateModel>({
  name: 'KeyChain',
  defaults: {
    PassPairs: [],
  }
})
@Injectable()
export class KeyChainState{
  @Action(SetPairsAction)
  setPairs(ctx: StateContext<KeyChainStateModel>, action: SetPairsAction) {
    const state = ctx.getState();
    const { pairs } = action;
    if (!pairs) return;
    ctx.setState({
      ...state,
      PassPairs: pairs
    });
  }

  @Action(ToggleShownAction)
  toggleShown(ctx: StateContext<KeyChainStateModel>, action: ToggleShownAction) {
    const state = ctx.getState();
    const { id } = action;
    if (!id) return;
    const newPair = {
      ...state.PassPairs.find(pair => pair.id === id),
      shown: !state.PassPairs.find(pair => pair.id === id)?.shown
    };
    const PassPairs = [...state.PassPairs.map(pair => pair.id === id ? newPair : pair)] as IPassPair[];
    ctx.setState({
      ...state,
      PassPairs
    });
  }
}
