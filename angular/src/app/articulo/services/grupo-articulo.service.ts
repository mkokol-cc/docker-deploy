import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, take} from 'rxjs';
import { GrupoArticulo } from '../model/grupo-articulo';
import { SweetalertService } from '../../services/sweetalert.service';
import { environment } from '../../../environments/environment.prod';
import { LoginService } from '../../usuario/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoArticuloService {

  constructor(private http:HttpClient, private sweetalertService:SweetalertService, private loginService:LoginService) { }
  
  async list():Promise<GrupoArticulo[]>{
    try {
      const response = await this.http.get<GrupoArticulo[]>(environment.apiUrl + this.getSelectedNegocio() + "/grupo-articulo").toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener los grupos de artículos", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al obtener los grupos de artículos", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async new(grupoArticulo:GrupoArticulo): Promise<void>{
    try {
      await this.http.post<GrupoArticulo[]>(environment.apiUrl + this.getSelectedNegocio() + "/grupo-articulo", grupoArticulo).toPromise();
      this.sweetalertService.alertSuccess("Genial!", "El grupo de artículo se guardó correctamente");
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al guardar el grupo de artículo", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async edit(id:number, grupoArticulo:GrupoArticulo): Promise<GrupoArticulo>{

    try {
      const response = await this.http.post<GrupoArticulo>(environment.apiUrl + this.getSelectedNegocio() + "/grupo-articulo/" + id,grupoArticulo).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al guardar el grupo de artículo", "");
        throw "No se obtuvo respuesta del servidor";
      }else{
        this.sweetalertService.alertSuccess("Genial!", "El grupo de artículo se editó correctamente");
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al editar el grupo de artículo",  error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async delete(id:number): Promise<any>{ 
    try {
      const response = await lastValueFrom<any>(
        this.http.delete(environment.apiUrl + this.getSelectedNegocio() + "/grupo-articulo/" + id).pipe(take(1))
      );
      this.sweetalertService.alertSuccess("Genial!","El grupo de artículo se eliminó correctamente");
      return response;
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al eliminar el grupo de artículo", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  getSelectedNegocio():string{
    console.log(this.loginService.getCookieNegocio())
    return this.loginService.getCookieNegocio();
  }

}
