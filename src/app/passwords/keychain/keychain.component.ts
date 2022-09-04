import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IPassPair, StateService } from 'src/app/shared/services/state.service';
import { EditPairComponent } from '../edit-pair/edit-pair.component';

@Component({
  selector: 'app-keychain',
  templateUrl: './keychain.component.html',
  styleUrls: ['./keychain.component.scss'],
})
export class KeychainComponent implements OnInit {
  public addForm!: FormGroup;
  public pairs$!: Observable<IPassPair[]>;

  constructor(
    private state: StateService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.addForm = this.fb.group({
      source: [null, Validators.required],
      login: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.pairs$ = this.state.getPairs();
  }

  ngOnInit(): void {
    this.state.getPairs().subscribe((pairs: IPassPair[]) => {
      console.log('pairs', pairs);
    });
  }

  public addPair(): void {
    this.state.addPassPair({
      ...this.addForm.value,
      shown: false,
      id: Date.now(),
    });
    this.addForm.reset();
  }

  public show(id: number): void {
    this.state.toggleShowPair(id);
  }

  public edit(pair: IPassPair): void {
    this.dialog.open(EditPairComponent, {
      width: '500px',
      data: pair,
    });
  }

  public remove(id: number): void {
    this.state.removePair(id);
  }

  replaceStars(inp: string): string {
    return [...inp].map(() => '*').join('');
  }
}
