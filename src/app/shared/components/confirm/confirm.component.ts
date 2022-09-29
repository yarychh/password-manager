import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    private ref: DialogRef,
    private firestoreService: FirestoreService,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    // with firebase
    // @Inject(MAT_DIALOG_DATA) public data: number,
  ) {}

  ngOnInit(): void {}

  public close(): void {
    this.ref.close();
  }
  public remove(): void {
    this.api.removePair(this.data);
    // with firebase
    // this.firestoreService.removePair(this.data);
    this.ref.close();
  }
}
