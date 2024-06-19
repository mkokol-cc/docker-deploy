import { Component, ElementRef, ViewChild } from '@angular/core';
import { GrupoArticuloService } from '../../services/grupo-articulo.service';
import { GrupoArticulo } from '../../model/grupo-articulo';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GrupoArticuloFormNewComponent } from '../grupo-articulo-form-new/grupo-articulo-form-new.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NoDataMessageComponent } from '../../../components/no-data-message/no-data-message.component';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-grupo-articulo-table',
  standalone: true,
  imports: [
    CommonModule,
    GrupoArticuloFormNewComponent,
    MatTableModule, 
    MatPaginatorModule,
    NoDataMessageComponent,
    LoaderComponent
  ],
  templateUrl: './grupo-articulo-table.component.html',
  styleUrl: './grupo-articulo-table.component.css'
})
export class GrupoArticuloTableComponent {

  listGrupoArticulo?:GrupoArticulo[];
  grupoArticuloSelected:GrupoArticulo = new GrupoArticulo();
  dataSource=new MatTableDataSource<GrupoArticulo>();

  displayedColumns: string[] = ['nombre', 'porcentajeRecargoSinIVA', 
  'porcentajeRecargoConIVA', 'porcentajeRecargoTarjeta', 'porcentajeRecargoTarjeta3Cuotas',
   'porcentajeRecargoTarjeta6Cuotas'];

  @ViewChild('grupoArticuloFormComponent', { static: false })
  grupoArticuloForm!: ElementRef;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  isLoading:boolean = false;

  constructor(public grupoArticuloService:GrupoArticuloService){
    this.list();
  }

  async list(){
    this.isLoading = true;
    this.listGrupoArticulo = await this.grupoArticuloService.list();
    this.dataSource = new MatTableDataSource<GrupoArticulo>(this.listGrupoArticulo);
    console.log(this.listGrupoArticulo)
    this.dataSource.paginator = this.paginator;
    this.isLoading = false;
  }

  edit(grupoArticulo:GrupoArticulo){
    this.grupoArticuloSelected=grupoArticulo;
    Swal.fire({
      html: this.grupoArticuloForm.nativeElement,
      customClass: {
        htmlContainer:'m-0',
        actions: 'd-none'
      }
    }).then(()=>{
      this.list();
    });
  }
  
  search(event: Event) {
    //tiene un problema que cuando hay un atributo undefined y el filtro es undefined se matchea
    //y los ids tambien, y nose si los articulos
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
