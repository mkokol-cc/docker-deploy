import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { NoDataMessageComponent } from '../../../components/no-data-message/no-data-message.component';
import { Perfil } from '../../model/perfil';
import { PerfilService } from '../../services/perfil.service';
import Swal from 'sweetalert2';
import { PerfilFormNewComponent } from '../perfil-form-new/perfil-form-new.component';

@Component({
  selector: 'app-perfil-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    MatPaginatorModule,
    NoDataMessageComponent,
    LoaderComponent,
    PerfilFormNewComponent
  ],
  templateUrl: './perfil-table.component.html',
  styleUrl: './perfil-table.component.css'
})
export class PerfilTableComponent {

  listPerfil?:Perfil[];
  dataSource=new MatTableDataSource<Perfil>();
  //displayedColumns: string[] = ['nombre','usuarios','roles'];
  displayedColumns: string[] = ['nombre'];

  perfilSelected:Perfil = new Perfil();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('perfilViewer', { static: false })
  perfilViewer!: ElementRef;

  isLoading:boolean = false;

  constructor(private perfilService:PerfilService){}

  ngOnInit(){
    this.getListPerfil();
  }

  async getListPerfil(){
    this.isLoading = true;
    this.listPerfil = await this.perfilService.list();
    this.dataSource = new MatTableDataSource<Perfil>(this.listPerfil);
    console.log(this.listPerfil)
    this.dataSource.paginator = this.paginator;
    this.isLoading = false;
  }

  edit(p:Perfil){
    console.log(p)
    this.perfilSelected = p;
    Swal.fire({
      width: 700,
      html: this.perfilViewer.nativeElement,
      customClass: {
        htmlContainer:'m-0',
        actions: 'd-none'
      }
    }).then(()=>{
      this.getListPerfil();
    });
  }
  
}
