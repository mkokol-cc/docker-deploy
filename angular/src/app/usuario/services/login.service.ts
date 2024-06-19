import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SweetalertService } from '../../services/sweetalert.service';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../model/usuario';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { Negocio } from '../../articulo/model/negocio';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private sweetalertService:SweetalertService, 
    private cookieService:CookieService, private router:Router) { }


  async login(usuario:Usuario){
    const loginData = {
      nombre:usuario.nombre,
      clave:usuario.clave
    }
    try {
      const response = await this.http.post(environment.apiUrl.toString() + "login", loginData, {responseType: 'text'}).toPromise();
      
      if(response === undefined){
        this.sweetalertService.alertError("Error", "Usuario o contraseña incorrectos");
        throw "Error de logueo";
      }else{
        //return response;
        console.log("El token obtenido es")
        console.log(response as string)
        this.setToken(response)
        //this.setDefaultSite();
        //redireccionar
        //this.router.navigateByUrl("/dashboard/home");
      }
    } catch (error:any) {
      console.log(error.body);
      this.sweetalertService.alertError("Error", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async myAccount(): Promise<Usuario>{
    try {
      const response = await this.http.get<Usuario>(environment.apiUrl.toString() + "my-account").toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error", "Error al obtener tus credenciales de usuario. Vuelve a ingresar sesion");
        //redireccionar al logueo
        this.router.navigateByUrl("/login");
        throw "Error de logueo";
      }else{
        this.setCookieObject('usuario', response);
        console.log(this.getCookieUserObject());
        return response;
      }
    } catch (error:any) {
      console.log(error);
      this.sweetalertService.alertError("Error al obtener tus credenciales de usuario", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  private setCookieObject(key: string, value: any/*, expires?: number*/) {
    this.cookieService.delete(key);
    // Serializar el objeto a JSON
    const serializedValue = JSON.stringify(value);
    // Guardar la cadena JSON en la cookie
    this.cookieService.set(key, serializedValue/*, expires*/);
  }

  getCookieUserObject(): Usuario {
    // Obtener la cadena JSON de la cookie
    const serializedValue = this.cookieService.get('usuario');
    // Deserializar la cadena JSON a un objeto
    return JSON.parse(serializedValue);
  }

  setCookieNegocio(n:Negocio){
    this.cookieService.delete('negocio');
    this.cookieService.set('negocio',Negocio[n])
  }

  getCookieNegocio():string{
    return this.cookieService.get('negocio');
  }

  getToken():string{
    return this.cookieService.get('token');
  }
  setToken(token:string){
    this.cookieService.delete('token');
    this.cookieService.set('token', token);
  }
  
  hasAuthority(value: string): boolean {
    const authorities = this.getCookieUserObject().authorities
    return authorities.some(authority => authority.authority === value);
  }

  logout(){
    this.cookieService.delete('token');
    this.cookieService.delete('usuario');
    this.cookieService.delete('negocio');
  }

  setDefaultSite(){
    if(this.cookieService.check('usuario')){
      const authorities = this.getCookieUserObject().authorities
      //let strNegocios = []
      Object.keys(Negocio).forEach(n=>{
        if(Negocio[Number(n)]){
          //console.log(Negocio[Number(n)])
          if(authorities.some(a=>a.authority==Negocio[Number(n)])){
            this.setCookieNegocio(Number(n));
          }
        }
      })
      console.log("SITIO POR DEFECTO: "+this.getCookieNegocio());
    }else{
      console.log("setDefaultSite(): No hay seteado ningun usuario")
    }
  }

}
