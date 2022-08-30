import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeychainComponent } from './keychain/keychain.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'keychain',
  },
  {
    path: 'keychain',
    component: KeychainComponent,
  },
];

@NgModule({
  declarations: [
    KeychainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PasswordsModule { }
