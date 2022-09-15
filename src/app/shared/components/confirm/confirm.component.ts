import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) {}

  ngOnInit(): void {}

  public close(): void {
    this.ref.close();
  }
  public remove(): void {
    this.firestoreService.removePair(this.data);
    this.ref.close();
  }
}
