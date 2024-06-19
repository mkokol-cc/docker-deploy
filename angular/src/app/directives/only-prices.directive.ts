import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyPrices]',
  standalone: true
})
export class OnlyPricesDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const initialValue = this.el.nativeElement.value;
    const regex = /^\d+(,\d{0,2})?$/;
    //const regexOnlyNumber = /^[0-9]+$/;
    if (!regex.test(initialValue)) {
      this.el.nativeElement.value = initialValue.slice(0, -1);
      this.el.nativeElement.dispatchEvent(new Event('input')); // Dispara un evento de input
    }
    /*
    else if(regexOnlyNumber.test(initialValue)){
      this.el.nativeElement.value += ",00";
    }
    */
  }

}
