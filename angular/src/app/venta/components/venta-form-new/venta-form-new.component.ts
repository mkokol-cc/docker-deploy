import { Component, ElementRef, ViewChild } from '@angular/core';
import { Articulo } from '../../../articulo/model/articulo';
import { Cliente } from '../../model/cliente';
import { Combo } from '../../../articulo/model/combo';
import { BaseItem } from '../../../articulo/model/base-item';
import { ClienteService } from '../../services/cliente.service';
import { ComboService } from '../../../articulo/services/combo.service';
import { ArticuloService } from '../../../articulo/services/articulo.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Venta } from '../../model/venta';
import { DetalleVenta } from '../../model/detalle-venta';
import { CondicionIVA } from '../../model/condicion-iva';
import { NoDataMessageComponent } from '../../../components/no-data-message/no-data-message.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { TipoPago } from '../../model/tipo-pago';
import { SelectorTipoPagoComponent } from '../selector-tipo-pago/selector-tipo-pago.component';
import { GrupoArticulo } from '../../../articulo/model/grupo-articulo';
import { VentaService } from '../../services/venta.service';
import { SearchBaseItemComponent } from '../search-base-item/search-base-item.component';

@Component({
  selector: 'app-venta-form-new',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    NoDataMessageComponent,
    ClienteFormComponent,
    SelectorTipoPagoComponent,
    MatTableModule,
    SearchBaseItemComponent
  ],
  templateUrl: './venta-form-new.component.html',
  styleUrl: './venta-form-new.component.css'
})
export class VentaFormNewComponent {

  @ViewChild(ClienteFormComponent) formCliente!: ClienteFormComponent;

  newVenta:Venta = new Venta();

  selectedTipoPago:TipoPago = 1;

  total:number = 0;

  @ViewChild(MatTable)
  table!: MatTable<DetalleVenta>;
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'cantidad', 'precioUnitario', 'subtotal'];

  date:Date = new Date();
  
  constructor(private ventaService:VentaService) {}

  



  addItem(item:BaseItem){
    //this.itemFilter.reset();
    let objetoEncontrado = this.newVenta.detalleVenta.find(det => det.item?.id === item.id);
    if(objetoEncontrado){
      objetoEncontrado.cantidad = objetoEncontrado.cantidad? objetoEncontrado.cantidad + 1 : 0;
    }else{
      let detVta = new DetalleVenta();
      detVta.item = item;
      detVta.cantidad = 1;
      //detVta.precioUnitario = item.precioCompra;
      this.newVenta.detalleVenta.push(detVta);
    }
    console.log(this.newVenta)
    this.refreshTable();
  }

  refreshTable(){
    this.newVenta.detalleVenta.forEach(det=>{
      det.precioUnitario = det.item?.calcularPrecioPorTipoPago(this.selectedTipoPago);
    })
    this.calcTotal();
    this.table.renderRows();
  }

  calcTotal(){
    let suma = 0;
    this.newVenta.detalleVenta.forEach(det=>{
      let precio = det.item? det.item.calcularPrecioPorTipoPago(this.selectedTipoPago) : 0
      let cant = det.cantidad? det.cantidad : 0;
      suma += (precio * cant);
    })
    this.total = suma;
  }
  
  async edit(detventa:DetalleVenta){

    const { value: cantidad, isDenied } = await Swal.fire({
      title: "Editar Detalle de Venta - "+detventa.item?.nombre,
      input: "number",
      inputValue: detventa.cantidad,
      inputLabel: "Ingrese la cantidad",
      inputPlaceholder: "Cantidad",
      showDenyButton: true,
      denyButtonText: "Eliminar Detalle",
      confirmButtonText: "Guardar",
      inputAttributes: {
        min: "0",
        max: "99999",
        step: "1"
      },
    });
    if (cantidad) {
      detventa.cantidad=cantidad;
      this.refreshTable();
    }
    if(isDenied){
      Swal.fire({
        title: "Seguro quieres eliminar el detalle de venta de "+detventa.item?.nombre+"?",
        showDenyButton: true,
        confirmButtonText: "Si, Eliminar",
        denyButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.newVenta.detalleVenta = this.newVenta.detalleVenta.filter(det => det !== detventa);
          this.refreshTable();
        }
      });
    }
  }


  getCliente(){
    let c = this.formCliente.formCliente.value;
    console.log(c);
    this.newVenta.cliente = c;
  }
  reciveTipoPago(tipoPago: TipoPago) {
    //alert("Soy el padre y me llego "+TipoPago[tipoPago])
    this.selectedTipoPago=tipoPago;
    this.refreshTable();
  }
  reciveBaseItem(baseItem: BaseItem) {
    //alert("Soy el padre y me llego "+TipoPago[tipoPago])
    console.log(baseItem);
    this.addItem(baseItem);
    //this.refreshTable();
  }

  submit(){
    this.newVenta.cliente = this.formCliente.getCliente();
    this.newVenta.fechaHora = new Date();
    this.newVenta.tipoPago = this.selectedTipoPago;
    //console.log(d.toISOString());
    //console.log(this.newVenta)
    this.ventaService.new(this.newVenta);
  }
  
}
