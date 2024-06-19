import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { environment } from '../../../environments/environment.prod';
import { SweetalertService } from '../../services/sweetalert.service';
import { LoginService } from '../../usuario/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient, private sweetalertService:SweetalertService, private loginService:LoginService) { }
  
  async list():Promise<Cliente[]>{
    try {
      const response = await this.http.get<Cliente[]>(environment.apiUrl + this.getSelectedNegocio() + "/cliente").toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener los clientes", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al obtener los clientes", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async edit(id:number, cliente:Cliente): Promise<Cliente>{

    try {
      const response = await this.http.post<Cliente>(environment.apiUrl + this.getSelectedNegocio() + "/cliente/" + id,cliente).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al guardar el cliente", "");
        throw "No se obtuvo respuesta del servidor";
      }else{
        this.sweetalertService.alertSuccess("Genial!", "El cliente se editó correctamente");
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al editar el cliente",  error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  getSelectedNegocio():string{
    console.log(this.loginService.getCookieNegocio())
    return this.loginService.getCookieNegocio();
  }

}
