import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appRestrictChars]',
})
export class RestrictCharsDirective {
  constructor() { }

  @HostListener('keydown', ['$event'])
  keyPressAlphanumeric(event: KeyboardEvent) {
    const inp = event.key;

    if (/^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/.test(inp)) {
      return true;
    } else {
      event.stopPropagation();
      return false;
    }
  }
}
