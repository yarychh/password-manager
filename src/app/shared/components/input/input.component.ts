import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() public value!: string;
  @Input() public placeholder!: string;
  @Input() public type: string = 'text';
  @Input() public autocomplete: string = 'off';

  constructor() {}

  public onChange(value: string): void {}
  public onTouched = () => {};

  writeValue(value: string | null): void {
    if (value === null) {
      this.value = '';
    } else {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}

  onInputValueChange(event: Event): void {
    const targetEl = event.target as HTMLInputElement;
    const value = targetEl.value;

    this.onChange(value);
  }
}
