import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPassPair } from 'src/app/shared/interfaces/passPair.interface';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-edit-pair',
  templateUrl: './edit-pair.component.html',
  styleUrls: ['./edit-pair.component.scss'],
})
export class EditPairComponent implements OnInit {
  public editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IPassPair,
    private firestoreService: FirestoreService,
    private ref: DialogRef
  ) {
    this.editForm = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.editForm.patchValue({
      login: this.data.login,
      password: this.data.password,
    });
  }

  public save(): void {
    this.firestoreService.updatePair(
      this.editForm.value.login,
      this.editForm.value.password,
      this.data.id
    ).then(() => this.ref.close())
  }
}
