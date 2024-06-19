import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { DetalleVenta } from '../../model/detalle-venta';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-detalle-venta-table',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './detalle-venta-table.component.html',
  styleUrl: './detalle-venta-table.component.css'
})
export class DetalleVentaTableComponent {

  @Input()
  detalleVentaEdit!: DetalleVenta[];

  @ViewChild(MatTable)
  table!: MatTable<DetalleVenta>;
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'cantidad', 'precioUnitario', 'subtotal'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ventaEdit'] && changes['ventaEdit'].currentValue) {
      //const articuloEdit = changes['ventaEdit'].currentValue as Venta;
      this.table.renderRows();
    }
  }

}
