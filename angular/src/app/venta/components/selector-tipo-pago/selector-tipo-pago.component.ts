import { Component, EventEmitter, Output } from '@angular/core';
import { TipoPago } from '../../model/tipo-pago';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selector-tipo-pago',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './selector-tipo-pago.component.html',
  styleUrl: './selector-tipo-pago.component.css'
})
export class SelectorTipoPagoComponent {
  
  @Output() selectedTipoPago = new EventEmitter<TipoPago>();
  selected:number = 1;
  send() {
    this.selectedTipoPago.emit(this.selected);
  }
}
