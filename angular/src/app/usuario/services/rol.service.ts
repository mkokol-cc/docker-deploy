import { Injectable } from '@angular/core';
import { Rol } from '../model/rol';
import { HttpClient } from '@angular/common/http';
import { SweetalertService } from '../../services/sweetalert.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient, private sweetalertService:SweetalertService) { }
  
  async list():Promise<Rol[]>{
    try {
      const response = await this.http.get<Rol[]>(environment.apiUrl + "rol").toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener los roles", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al obtener los roles", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

}
