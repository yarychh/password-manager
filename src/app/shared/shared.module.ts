import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TranslateModule } from '@ngx-translate/core';
import { starPipe } from './pipes/star.pipe';
import { RestrictCharsDirective } from './directives/restrict-chars.directive';

@NgModule({
  declarations: [HeaderComponent, InputComponent, ConfirmComponent, starPipe, RestrictCharsDirective],
  imports: [FormsModule, CommonModule, TranslateModule],
  exports: [HeaderComponent, InputComponent, TranslateModule, starPipe],
})
export class SharedModule {}
