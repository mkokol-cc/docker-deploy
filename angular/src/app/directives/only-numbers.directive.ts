import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const initialValue = this.el.nativeElement.value;
    const regex = /^[0-9]+$/;
    if (!regex.test(initialValue)) {
      this.el.nativeElement.value = initialValue.slice(0, -1);
      this.el.nativeElement.dispatchEvent(new Event('input')); // Dispara un evento de input
    }
  }

}
