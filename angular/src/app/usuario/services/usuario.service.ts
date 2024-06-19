import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { lastValueFrom, take } from 'rxjs';
import { Usuario } from '../model/usuario';
import { HttpClient } from '@angular/common/http';
import { SweetalertService } from '../../services/sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private sweetalertService:SweetalertService) { }
  
  async list():Promise<Usuario[]>{
    try {
      const response = await this.http.get<Usuario[]>(environment.apiUrl + "usuario").toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener los usuarios", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al obtener los usuarios", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async new(usuario:Usuario): Promise<void>{
    try {
      await this.http.post<Usuario[]>(environment.apiUrl + "usuario", usuario).toPromise();
      this.sweetalertService.alertSuccess("Genial!", "El usuario se guardó correctamente");
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al guardar el usuario", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }
  /*
  async edit(id:number, usuario:Usuario): Promise<Usuario>{

    try {
      const response = await this.http.post<Usuario>(environment.apiUrl + "usuario/" + id,usuario).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al guardar el usuario", "");
        throw "No se obtuvo respuesta del servidor";
      }else{
        this.sweetalertService.alertSuccess("Genial!", "El usuario se editó correctamente");
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al editar el usuario",  error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }*/

  async delete(id:number): Promise<any>{ 
    try {
      const response = await lastValueFrom<any>(
        this.http.delete(environment.apiUrl + "usuario/" + id).pipe(take(1))
      );
      this.sweetalertService.alertSuccess("Genial!","El usuario se eliminó correctamente");
      return response;
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al eliminar el usuario", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }
}
