import { Component, Input, SimpleChanges } from '@angular/core';
import { Negocio } from '../../articulo/model/negocio';
import { Usuario } from '../../usuario/model/usuario';
import { CommonModule } from '@angular/common';
import { Authority } from '../../usuario/model/authority';
import { RouterOutlet, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent {

  @Input()
  usuario!: Usuario;

  enableFormVenta = {
    authorityName:"VENTA_EDITOR",
    enable:false
  }
  enableTableVenta = {
    authorityName:"VENTA_VIEWER",
    enable:false
  }
  enableFormGrupoArticulo = {
    authorityName:"GRUPO_ARTICULO_EDITOR",
    enable:false
  }
  enableTableGrupoArticulo = {
    authorityName:"GRUPO_ARTICULO_VIEWER",
    enable:false
  }
  enableFormArticulo = {
    authorityName:"ARTICULO_EDITOR",
    enable:false
  }
  enableTableArticulo = {
    authorityName:"ARTICULO_VIEWER",
    enable:false
  }
  enableFormCombo = {
    authorityName:"COMBO_EDITOR",
    enable:false
  }
  enableTableCombo = {
    authorityName:"COMBO_VIEWER",
    enable:false
  }
  enableFormUsuario = {
    authorityName:"USUARIO_EDITOR",
    enable:false
  }
  enableTableUsuario = {
    authorityName:"USUARIO_VIEWER",
    enable:false
  }
  enableFormPerfil = {
    authorityName:"PERFIL_EDITOR",
    enable:false
  }
  enableTablePerfil = {
    authorityName:"PERFIL_VIEWER",
    enable:false
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuario'] && changes['usuario'].currentValue) {
      const u = changes['usuario'].currentValue as Usuario;
      this.refreshMenu();
    }
  }

  refreshMenu(){
    this.usuario.authorities.forEach(a=>{
      if(a.authority == this.enableFormVenta.authorityName){
        this.enableFormVenta.enable = true;
      }
      if(a.authority == this.enableTableVenta.authorityName){
        this.enableTableVenta.enable = true;
      }
      if(a.authority == this.enableFormGrupoArticulo.authorityName){
        this.enableFormGrupoArticulo.enable = true;
      }
      if(a.authority == this.enableTableGrupoArticulo.authorityName){
        this.enableTableGrupoArticulo.enable = true;
      }
      if(a.authority == this.enableFormArticulo.authorityName){
        this.enableFormArticulo.enable = true;
      }
      if(a.authority == this.enableTableArticulo.authorityName){
        this.enableTableArticulo.enable = true;
      }
      if(a.authority == this.enableFormCombo.authorityName){
        this.enableFormCombo.enable = true;
      }
      if(a.authority == this.enableTableCombo.authorityName){
        this.enableTableCombo.enable = true;
      }


      if(a.authority == this.enableFormUsuario.authorityName){
        this.enableFormUsuario.enable = true;
      }
      if(a.authority == this.enableTableUsuario.authorityName){
        this.enableTableUsuario.enable = true;
      }
      if(a.authority == this.enableFormPerfil.authorityName){
        this.enableFormPerfil.enable = true;
      }
      if(a.authority == this.enableTablePerfil.authorityName){
        this.enableTablePerfil.enable = true;
      }
      
    })
  }

}
