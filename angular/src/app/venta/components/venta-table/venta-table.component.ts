import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { NoDataMessageComponent } from '../../../components/no-data-message/no-data-message.component';
import { Venta } from '../../model/venta';
import { VentaService } from '../../services/venta.service';
import Swal from 'sweetalert2';
import { DetalleVentaTableComponent } from '../detalle-venta-table/detalle-venta-table.component';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { SearchBarComponent } from '../../../components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-venta-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule, 
    MatPaginatorModule,
    NoDataMessageComponent,
    LoaderComponent,
    DetalleVentaTableComponent,
    ClienteFormComponent,
    SearchBarComponent
  ],
  templateUrl: './venta-table.component.html',
  styleUrl: './venta-table.component.css'
})
export class VentaTableComponent {

  listVenta?:Venta[];
  ventaSelected:Venta = new Venta();
  dataSource=new MatTableDataSource<Venta>();

  displayedColumns: string[] = ['fechaHora','total','tipoPago',
  'clienteCuitDni','clienteNombre'];
  
  @ViewChild('ventaViewer', { static: false })
  ventaViewer!: ElementRef;
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private ventaService:VentaService){
    this.list();
  }

  pageIndex:number = 0;
  pageSize:number = 5;
  asc?:boolean;
  porFechaHora?:boolean;
  porTotalVta?:boolean;
  busqueda?:string;
  fechaInicio:string = '';
  fechaFin:string = '';

  cant?:number;

  isLoading:boolean=false;


  async list(){
    this.isLoading = true;
    console.log("Filtros: ",
    "pageIndex ",this.pageIndex,
    "pageSize ",this.pageSize,
    "asc ",this.asc,
    "porFechaHora ",this.porFechaHora,
    "porTotalVta ",this.porTotalVta,
    "busqueda ",this.busqueda,
    "fechaInicio ",this.fechaInicio,
    "fechaFin ",this.fechaFin
    )
    this.listVenta = await this.ventaService.list(
      this.pageIndex,
      this.pageSize,
      this.asc,
      this.porFechaHora,
      this.porTotalVta,
      this.busqueda,
      this.fechaInicio,
      this.fechaFin
    );
    this.dataSource = new MatTableDataSource<Venta>(this.listVenta);
    console.log(this.listVenta)
    //this.dataSource.paginator = this.paginator;
    this.count();
    this.isLoading = false;
  }

  async count(){
    this.cant = await this.ventaService.count(
      this.busqueda
    );
  }

  clearfilter(){
    //this.filter = undefined;
    this.busqueda = undefined;
    this.list();
  }

  receiveSearchValue(data: string) {
    this.busqueda = data;
    this.list();
  }

  onInitDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fechaInicio = input.value;
    this.list();
  }
  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fechaFin = input.value;
    this.list();
  }

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    switch (Number(selectedValue)) {
      case 1:
        this.orderBy(false,true,false);
        break;
      case 2:
        this.orderBy(true,true,false);
        break;
      case 3:
        this.orderBy(false,false,true);
        break;
      case 4:
        this.orderBy(true,false,true);
        break;
      default:
        this.orderBy(false,false,false);
    }
  }
  orderBy(asc:boolean, porFechaHora:boolean, porTotalVta:boolean){
    this.asc = asc;
    this.porFechaHora = porFechaHora;
    this.porTotalVta = porTotalVta;
    this.list();
  }

  edit(venta:Venta){
    this.ventaSelected=venta;
    Swal.fire({
      width: 700,
      html: this.ventaViewer.nativeElement,
      customClass: {
        htmlContainer:'m-0',
        actions: 'd-none'
      }
    }).then(()=>{
      this.list();
    });
  }

  formattedDate(date:any):Date{
    const [year, month, day, hours, minutes, seconds] = date;
    // Crear un objeto Date con las partes de la fecha
    const fechaVenta: Date = new Date(year, month - 1, day, hours, minutes, seconds);
    return fechaVenta
  }

  calcularTotal(vta:Venta){

    let total = 0;
    vta.detalleVenta.forEach(det=>{
      let precio = det.precioUnitario ? det.precioUnitario : 0;
      let cantidad = det.cantidad ? det.cantidad : 0;
      console.log(det.item?.codigo + " : cantidad-"+det.cantidad+" precio-"+det.precioUnitario);
      console.log(det)
      total += (precio * cantidad)
    })

    return total;
  }

}
