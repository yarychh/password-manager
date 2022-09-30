import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { first, Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { KeychainSelectors } from 'src/app/shared/state/keychain.selectors';
import { EditPairComponent } from '../edit-pair/edit-pair.component';
import { Store } from '@ngxs/store';
import { ToggleShownAction } from 'src/app/shared/state/keychain.actions';
import { IPassPair } from 'src/app/shared/interfaces/passPair.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-keychain',
  templateUrl: './keychain.component.html',
  styleUrls: ['./keychain.component.scss'],
})
export class KeychainComponent implements OnInit {
  public addForm!: FormGroup;
  public fetching = false;
  public sortedPairs: any[] = [];
  @Select(KeychainSelectors.pairs) pairs$!: Observable<IPassPair[]>;
  @Select(KeychainSelectors.sortedPairs) sortedPairs$!: Observable<Array<IPassPair[]>>;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private firestoreService: FirestoreService,
    private api: ApiService,
    private store: Store
  ) {
    this.addForm = this.fb.group({
      source: [null, Validators.required],
      login: [null, Validators.required],
      password: [null, Validators.required],
      category: ['General', Validators.required],
    });
  }

  ngOnInit(): void {
    this.api.getPairs();

    // with firebase
    // this.firestoreService.getPairs();
  }

  public addPair(): void {
    this.fetching = true;
    const newPair = {
      ...this.addForm.value,
      shown: false,
    };
    this.api.addPair(newPair);
    this.api.getPairs();
    this.addForm.reset();
    this.fetching = false;

    // with firebase
    // this.firestoreService
    //   .addPair({
    //     ...this.addForm.value,
    //     shown: false,
    //     id: Date.now(),
    //   })
    //   .then(() => {
    //     this.firestoreService.getPairs();
    //     this.fetching = false;
    //     this.addForm.reset();
    //   });
  }

  public edit(pair: IPassPair): void {
    this.fetching = true;
    this.dialog
      .open(EditPairComponent, {
        width: '500px',
        data: pair,
      })
      .afterClosed()
      .subscribe(() => {
        this.api.getPairs();
        this.fetching = false;
        // with firebase
        // this.firestoreService.getPairs()
      });
  }

  // with firebase
  // public remove(id: number): void {
  public remove(id: string): void {
    this.fetching = true;
    this.dialog
      .open(ConfirmComponent, {
        width: '500px',
        data: id,
      })
      .afterClosed()
      .subscribe(() => {
        this.api.getPairs();
        // with firebase
        // this.firestoreService.getPairs();
        this.fetching = false;
      });
  }

  // with firebase
  // public toggleShown(id: number): void {
  public toggleShown(id: string): void {
    this.store.dispatch(new ToggleShownAction(id));
  }
}
