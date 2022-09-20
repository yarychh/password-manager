import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { KeychainSelectors } from 'src/app/shared/state/keychain.selectors';
import { EditPairComponent } from '../edit-pair/edit-pair.component';
import { Store } from '@ngxs/store';
import { ToggleShownAction } from 'src/app/shared/state/keychain.actions';
import { IPassPair } from 'src/app/shared/interfaces/passPair.interface';


@Component({
  selector: 'app-keychain',
  templateUrl: './keychain.component.html',
  styleUrls: ['./keychain.component.scss'],
})
export class KeychainComponent implements OnInit {
  public addForm!: FormGroup;
  public fetching = false;
  @Select(KeychainSelectors.pairs) pairs$!: Observable<IPassPair[]>

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private firestoreService: FirestoreService,
    private store: Store
  ) {
    this.addForm = this.fb.group({
      source: [null, Validators.required],
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.firestoreService.getPairs();
  }

  public addPair(): void {
    this.fetching = true;
    this.firestoreService.addPair({
      ...this.addForm.value,
      shown: false,
      id: Date.now(),
    }).then(() => {
      this.firestoreService.getPairs();
      this.fetching = false;
      this.addForm.reset();
    })
  }

  public edit(pair: IPassPair): void {
    this.dialog.open(EditPairComponent, {
      width: '500px',
      data: pair,
    })
      .afterClosed()
      .subscribe(() => this.firestoreService.getPairs());
  }

  public remove(id: number): void {
    this.fetching = true;
    this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: id
    })
      .afterClosed()
      .subscribe(() => {
        this.firestoreService.getPairs();
        this.fetching = false;
      });
  }

  public toggleShown(id: number): void {
    this.store.dispatch(new ToggleShownAction(id));
  }
}
