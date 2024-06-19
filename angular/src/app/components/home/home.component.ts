import { Component } from '@angular/core';
import { LoginService } from '../../usuario/services/login.service';
import { Usuario } from '../../usuario/model/usuario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  usuario?:Usuario;
  
  constructor(private loginService:LoginService){}

  ngOnInit(){
    this.usuario = this.loginService.getCookieUserObject();
  }

}
