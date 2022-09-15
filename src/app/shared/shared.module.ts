import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [HeaderComponent, InputComponent, ConfirmComponent],
  imports: [FormsModule, CommonModule],
  exports: [HeaderComponent, InputComponent],
})
export class SharedModule {}
