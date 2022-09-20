import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appRestrictChars]',
})
export class RestrictCharsDirective {
  constructor() { }

  @HostListener('keyup', ['$event'])
  keyPressAlphanumeric(event: KeyboardEvent) {
    const inp = event.key;

    // console.log('inp', inp);


    if (/^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/.test(inp)) {
      // console.log('pass');

      return true;
    } else {
      // console.log('fail');
      // event.stopPropagation();
      event.preventDefault();
      return false;
    }
  }
}
