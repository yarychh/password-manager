import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPassPair } from 'src/app/shared/interfaces/passPair.interface';

@Component({
  selector: 'app-pair',
  templateUrl: './pair.component.html',
  styleUrls: ['./pair.component.scss'],
})
export class PairComponent {
  @Input() public pair!: IPassPair;
  @Output() editPair = new EventEmitter<IPassPair>();
  @Output() deletePair = new EventEmitter<string>();
  @Output() toggleShowPair = new EventEmitter<string>();

  constructor() {}

  public edit(pair: IPassPair): void {
    this.editPair.emit(pair);
  }

  public remove(id: string): void {
    this.deletePair.emit(id);
  }

  public toggleShown(id: string): void {
    this.toggleShowPair.emit(id);
  }
}
