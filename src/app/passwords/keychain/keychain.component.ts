import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { IPassPair } from 'src/app/shared/constants/passPair.interface';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { EditPairComponent } from '../edit-pair/edit-pair.component';

@Component({
  selector: 'app-keychain',
  templateUrl: './keychain.component.html',
  styleUrls: ['./keychain.component.scss'],
})
export class KeychainComponent implements OnInit {
  public addForm!: FormGroup;
  public pairs$!: Observable<IPassPair[]>;
  public fetching = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private firestoreService: FirestoreService
  ) {
    this.addForm = this.fb.group({
      source: [null, Validators.required],
      login: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.pairs$ = this.firestoreService.getPairs();
  }

  ngOnInit(): void {
  }

  public addPair(): void {
    this.fetching = true;
    this.firestoreService.addPair({
      ...this.addForm.value,
      shown: false,
      id: Date.now(),
    }).then(() => {
      this.addForm.reset();
      this.pairs$ = this.firestoreService.getPairs();
      this.fetching = false;
    })
  }

  public edit(pair: IPassPair): void {
    this.dialog.open(EditPairComponent, {
      width: '500px',
      data: pair,
    })
      .afterClosed()
      .subscribe(() => this.pairs$ = this.firestoreService.getPairs());
  }

  public remove(id: number): void {
    this.fetching = true;
    this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: id
    })
      .afterClosed()
      .subscribe(() => {
        this.pairs$ = this.firestoreService.getPairs();
        this.fetching = false;
      });
  }

  replaceStars(inp: string): string {
    return [...inp].map(() => '*').join('');
  }
}
