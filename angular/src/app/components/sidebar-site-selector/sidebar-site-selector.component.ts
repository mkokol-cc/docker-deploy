import { Component, Input, SimpleChanges } from '@angular/core';
import { Usuario } from '../../usuario/model/usuario';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../usuario/services/login.service';
import { Negocio } from '../../articulo/model/negocio';

@Component({
  selector: 'app-sidebar-site-selector',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sidebar-site-selector.component.html',
  styleUrl: './sidebar-site-selector.component.css'
})
export class SidebarSiteSelectorComponent {
  @Input()
  usuario!: Usuario;
  enableFerreteria = {
    authorityName:"FERRETERÍA",
    enable:false,
    enumNegocioPosition: 0
  }
  enableMuebleria = {
    authorityName:"MUEBLERÍA",
    enable:false,
    enumNegocioPosition: 1
  }
  enableSeguridad = {
    authorityName:"SEGURIDAD",
    enable:false,
    enumNegocioPosition: 2
  }

  constructor(private loginService:LoginService){
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuario'] && changes['usuario'].currentValue) {
      const u = changes['usuario'].currentValue as Usuario;
      this.refreshMenu();
    }
  }

  refreshMenu(){
    this.enableFerreteria.enable = this.loginService.hasAuthority(this.enableFerreteria.authorityName)
    this.enableMuebleria.enable = this.loginService.hasAuthority(this.enableMuebleria.authorityName)
    this.enableSeguridad.enable = this.loginService.hasAuthority(this.enableSeguridad.authorityName)
  }

  change(obj:any){
    let n = Negocio[obj.authorityName];
    this.loginService.setCookieNegocio(Number(n));
    window.location.reload();
  }
}
