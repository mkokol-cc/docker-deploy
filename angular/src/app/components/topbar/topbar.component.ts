import { Component } from '@angular/core';
import { LoginService } from '../../usuario/services/login.service';
import { Usuario } from '../../usuario/model/usuario';
import { Negocio } from '../../articulo/model/negocio';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  
  usuario:Usuario = new Usuario;
  negocio?:string;
  negocioNumber?:number;

  constructor(private router:Router, private loginService:LoginService){}

  ngOnInit(){
    this.usuario = this.loginService.getCookieUserObject();
    this.negocio = this.loginService.getCookieNegocio();
    this.negocioNumber = Negocio[this.negocio as keyof typeof Negocio]
  }

  exit(){
    Swal.fire({
      title: "Salír",
      text: "¿Quieres cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      //confirmButtonColor: "#3085d6",
      //cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, cerrar sesión!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.closeSesion();
      }
    });
  }

  closeSesion(){
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }

}
