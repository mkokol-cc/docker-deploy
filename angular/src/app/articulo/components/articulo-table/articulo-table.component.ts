import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Articulo } from '../../model/articulo';
import { ArticuloService } from '../../services/articulo.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ArticuloFormNewComponent } from '../articulo-form-new/articulo-form-new.component';
import { NoDataMessageComponent } from '../../../components/no-data-message/no-data-message.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../../components/search-bar/search-bar.component';
import { BarcodeComponent } from '../barcode/barcode.component';


@Component({
  selector: 'app-articulo-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule, 
    MatPaginatorModule,
    ArticuloFormNewComponent,
    NoDataMessageComponent,
    LoaderComponent,
    SearchBarComponent,
    BarcodeComponent
  ],
  templateUrl: './articulo-table.component.html',
  styleUrl: './articulo-table.component.css'
})
export class ArticuloTableComponent implements OnInit{
  
  listArticulo?:Articulo[];
  articuloSelected:Articulo = new Articulo();
  dataSource=new MatTableDataSource<Articulo>();

  displayedColumns: string[] = ['nombre','descripcion',
  'codigo','grupo','precioCompra','precioVenta','stock'];

  @ViewChild('articuloFormComponent', { static: false })
  articuloForm!: ElementRef;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  cant:number = 0;
  isLoading:boolean = false;

  constructor(private articuloService:ArticuloService){}
  
  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.isLoading = true;
    this.list();
    this.count();
    this.isLoading = false;
  }

  async list(){

      console.log("Filtros: ",
      "pageIndex ",this.pageIndex,
      "pageSize ",this.pageSize,
      "asc ",this.asc,
      "porNombre ",this.porNombre,
      "porPrecioCompra ",this.porPrecioCompra,
      "porCodigo ",this.porCodigo,
      "busqueda ",this.busqueda
      )
      this.listArticulo = await this.articuloService.list(
        this.pageIndex,
        this.pageSize,
        this.asc,
        this.porNombre,
        this.porPrecioCompra,
        this.porCodigo,
        this.busqueda);
      this.dataSource = new MatTableDataSource<Articulo>(this.listArticulo);
      console.log(this.listArticulo)
      //this.dataSource.paginator = this.paginator;
  }

  async count(){
    this.cant = await this.articuloService.count(
      this.busqueda
    );
  }

  edit(articulo:Articulo){
    this.articuloSelected=articulo;
    Swal.fire({
      html: this.articuloForm.nativeElement,
      customClass: {
        htmlContainer:'m-0',
        actions: 'd-none'
      }
    }).then(()=>{
      this.refresh();
    });
  }


  clearfilter(){
    //this.filter = undefined;
    this.busqueda = undefined;
    this.refresh();
  }

  receiveSearchValue(data: string) {
    this.busqueda = data;
    this.refresh();
  }
/*
  async filtrar(busqueda:string | undefined){
    this.filter = busqueda;
    this.busqueda = busqueda;
    this.list();
  }
*/
  pageEvent?:PageEvent;
  length?:number;
  pageSize:number=5;
  pageIndex:number=0;

  busqueda?:string;

  async handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.refresh();
  }

  asc?:boolean;
  porNombre?:boolean;
  porPrecioCompra?:boolean;
  porCodigo?:boolean;

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
    this.refresh();
  }

}