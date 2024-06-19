import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Combo } from '../../model/combo';
import { ComboService } from '../../services/combo.service';
import { ComboFormNewComponent } from '../combo-form-new/combo-form-new.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NoDataMessageComponent } from '../../../components/no-data-message/no-data-message.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { SearchBarComponent } from '../../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-combo-table',
  standalone: true,
  imports: [
    CommonModule,
    ComboFormNewComponent,
    MatTableModule, 
    MatPaginatorModule,
    NoDataMessageComponent,
    LoaderComponent,
    SearchBarComponent
  ],
  templateUrl: './combo-table.component.html',
  styleUrl: './combo-table.component.css'
})
export class ComboTableComponent {
  listCombo?:Combo[];
  comboSelected:Combo = new Combo();
  dataSource=new MatTableDataSource<Combo>();

  displayedColumns: string[] = ['nombre', 'codigo', 'porcentajeRecargoSinIVA', 
  'porcentajeRecargoConIVA', 'porcentajeRecargoTarjeta', 'porcentajeRecargoTarjeta3Cuotas',
   'porcentajeRecargoTarjeta6Cuotas'];

  @ViewChild('comboFormComponent', { static: false })
  comboForm!: ElementRef;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  pageIndex:number = 0;
  pageSize:number = 5;
  asc?:boolean;
  porNombre?:boolean;
  porPrecioCompra?:boolean;
  porCodigo?:boolean;
  busqueda?:string;

  cant?:number;

  isLoading:boolean=false;

  constructor(public comboService:ComboService){
    this.list();
  }

  async list(){
    this.isLoading = true;
    console.log("Filtros: ",
    "pageIndex ",this.pageIndex,
    "pageSize ",this.pageSize,
    "asc ",this.asc,
    "porNombre ",this.porNombre,
    "porPrecioCompra ",this.porPrecioCompra,
    "porCodigo ",this.porCodigo,
    "busqueda ",this.busqueda
    )
    this.listCombo = await this.comboService.list(
      this.pageIndex,
      this.pageSize,
      this.asc,
      this.porNombre,
      this.porPrecioCompra,
      this.porCodigo,
      this.busqueda
    );
    this.dataSource = new MatTableDataSource<Combo>(this.listCombo);
    console.log(this.listCombo)
    //this.dataSource.paginator = this.paginator;
    this.count();
    this.isLoading = false;
  }

  async count(){
    this.cant = await this.comboService.count(
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

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    switch (Number(selectedValue)) {
      case 1:
        this.orderBy(false,false,true,false);
        break;
      case 2:
        this.orderBy(true,false,true,false);
        break;
      case 3:
        this.orderBy(false,false,false,true);
        break;
      case 4:
        this.orderBy(true,false,false,true);
        break;
      case 5:
        this.orderBy(true,true,false,false);
        break;
      case 6:
        this.orderBy(false,true,false,false);//revisar en el back deben estar al reves los filtros asc y desc para nombre
        break;
      default:
        this.orderBy(false,false,false,false);
    }
  }
  orderBy(asc:boolean, porNombre:boolean, porPrecioCompra:boolean, porCodigo:boolean){
    this.asc = asc;
    this.porNombre = porNombre;
    this.porPrecioCompra = porPrecioCompra;
    this.porCodigo = porCodigo;
    this.list();
  }

  edit(combo:Combo){
    this.comboSelected=combo;
    Swal.fire({
      html: this.comboForm.nativeElement,
      customClass: {
        htmlContainer:'m-0',
        actions: 'd-none'
      }
    }).then(()=>{
      this.list();
    });
  }
  /*
  search(event: Event) {
    //tiene un problema que cuando hay un atributo undefined y el filtro es undefined se matchea
    //y los ids tambien, y nose si los articulos
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }*/
}
