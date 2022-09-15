import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeychainComponent } from './keychain/keychain.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditPairComponent } from './edit-pair/edit-pair.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


const routes: Routes = [
  {
    path: '',
    component: KeychainComponent,
  },
];

@NgModule({
  declarations: [KeychainComponent, EditPairComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressBarModule
  ],
})
export class PasswordsModule {}
