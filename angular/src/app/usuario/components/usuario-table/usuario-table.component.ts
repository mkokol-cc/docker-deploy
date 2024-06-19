import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { NoDataMessageComponent } from '../../../components/no-data-message/no-data-message.component';
import Swal from 'sweetalert2';
import { UsuarioFormNewComponent } from '../usuario-form-new/usuario-form-new.component';

@Component({
  selector: 'app-usuario-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    MatPaginatorModule,
    NoDataMessageComponent,
    LoaderComponent,
    UsuarioFormNewComponent
  ],
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.css'
})
export class UsuarioTableComponent {

  listUsuario?:Usuario[];
  dataSource=new MatTableDataSource<Usuario>();
  displayedColumns: string[] = ['nombre','roles'];
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  selectedUsuario:Usuario = new Usuario();
  @ViewChild('usuarioViewer', { static: false })
  usuarioViewer!: ElementRef;

  isLoading:boolean = false;

  constructor(private usuarioService:UsuarioService){}

  ngOnInit(){
    this.getListUsuario();
  }

  async getListUsuario(){
    this.isLoading = true;
    this.listUsuario = await this.usuarioService.list();
    this.dataSource = new MatTableDataSource<Usuario>(this.listUsuario);
    console.log(this.listUsuario)
    this.dataSource.paginator = this.paginator;
    this.isLoading = false;
  }

  edit(u:Usuario){
    this.selectedUsuario = u;
    Swal.fire({
      width: 700,
      html: this.usuarioViewer.nativeElement,
      customClass: {
        htmlContainer:'m-0',
        actions: 'd-none'
      }
    }).then(()=>{
      this.getListUsuario();
    });
  }

}
