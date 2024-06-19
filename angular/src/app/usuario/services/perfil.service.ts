import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SweetalertService } from '../../services/sweetalert.service';
import { environment } from '../../../environments/environment.prod';
import { lastValueFrom, take } from 'rxjs';
import { Perfil } from '../model/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http:HttpClient, private sweetalertService:SweetalertService) { }
  
  async list():Promise<Perfil[]>{
    try {
      const response = await this.http.get<Perfil[]>(environment.apiUrl + "perfil").toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener los perfiles", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al obtener los perfiles", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async new(perfil:Perfil): Promise<void>{
    try {
      await this.http.post<Perfil[]>(environment.apiUrl + "perfil", perfil).toPromise();
      this.sweetalertService.alertSuccess("Genial!", "El perfil se guardó correctamente");
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al guardar el perfil", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }
  /*
  async edit(id:number, perfil:Perfil): Promise<Perfil>{

    try {
      const response = await this.http.post<Perfil>(environment.apiUrl + "perfil/" + id,perfil).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al guardar el perfil", "");
        throw "No se obtuvo respuesta del servidor";
      }else{
        this.sweetalertService.alertSuccess("Genial!", "El perfil se editó correctamente");
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al editar el perfil",  error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }*/

  async delete(id:number): Promise<any>{ 
    try {
      const response = await lastValueFrom<any>(
        this.http.delete(environment.apiUrl + "perfil/" + id).pipe(take(1))
      );
      this.sweetalertService.alertSuccess("Genial!","El perfil se eliminó correctamente");
      return response;
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al eliminar el perfil", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  getSelectedNegocio():string{
    console.log(localStorage.getItem("negocio")! || "");
    return localStorage.getItem("negocio")! || "";
  }
}
