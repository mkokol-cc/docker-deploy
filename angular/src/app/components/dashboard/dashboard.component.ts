import { Component, OnInit } from '@angular/core';
import { ArticuloTableComponent } from '../../articulo/components/articulo-table/articulo-table.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Negocio } from '../../articulo/model/negocio';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { LoginService } from '../../usuario/services/login.service';
import { Usuario } from '../../usuario/model/usuario';
import { SidebarSiteSelectorComponent } from '../sidebar-site-selector/sidebar-site-selector.component';
import { TopbarComponent } from '../topbar/topbar.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ArticuloTableComponent,
    RouterOutlet,
    RouterModule,
    CommonModule,
    LoaderComponent,
    SidebarMenuComponent,
    SidebarSiteSelectorComponent,
    TopbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  negocioSeleccionado?:number;
  negocioName?:string;
  load:boolean = false;

  usuario:Usuario = new Usuario();
  constructor(private loginService:LoginService){}

  ngOnInit(): void {
    this.loadScripts();
    this.usuario = this.loginService.getCookieUserObject();
    this.negocioName = this.loginService.getCookieNegocio();
    this.negocioSeleccionado = this.getNegocio(this.negocioName);
    console.log("Dashboard.ngOnInit: "+this.negocioSeleccionado)
  }

  loadScripts(): void{
    const scriptElement2 = document.createElement('script');
    scriptElement2.src="assets/themplate/js/sb-admin-2.min.js";
    document.body.appendChild(scriptElement2);
  }

  getNegocio(value:string):number | undefined{
    for (const key in Negocio) {
      console.log("Iteracion: key = "+key)
      console.log("Iteracion: key = "+Negocio[key])
      console.log("Iteracion: "+Negocio[key]+" - "+value)
      console.log("Iteracion: Negocio[key] === value : "+Negocio[key] === value)
      console.log("Iteracion: Negocio[key] == value : "+Negocio[key] == value)
      if (Negocio[key] === value) {
        return Number(key);
      }
    }
    return undefined;
  }

}
