import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Combo } from '../model/combo';
import { Type } from '../model/type';
import { SweetalertService } from '../../services/sweetalert.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { take } from 'rxjs/internal/operators/take';
import { environment } from '../../../environments/environment.prod';
import { LoginService } from '../../usuario/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  constructor(private http:HttpClient, private sweetalertService:SweetalertService, private loginService:LoginService) { }

  async count(busqueda: string = ''):Promise<number>{
      let params = new HttpParams()
      .set('busqueda', busqueda);
    try {
      const response = await this.http.get<number>(environment.apiUrl.toString() + this.getSelectedNegocio() + "/combo/count",{params}).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener los combos", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error);
      this.sweetalertService.alertError("Error al obtener los combos", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async list(page: number = 0, size: number = 10, asc: boolean = false, 
    porNombre: boolean = false, porPrecioCompra: boolean = false, 
    porCodigo: boolean = false, busqueda: string = ''):Promise<Combo[]>{
      let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('asc', asc.toString())
      .set('porNombre', porNombre.toString())
      .set('porPrecioCompra', porPrecioCompra.toString())
      .set('porCodigo', porCodigo.toString())
      .set('busqueda', busqueda);
    try {
      const response = await this.http.get<Combo[]>(environment.apiUrl + this.getSelectedNegocio() + "/combo",{params}).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener los combos", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al obtener los combos", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async new(combo:Combo): Promise<void>{
    try {
      combo.type=Type[Type.Combo];
      await this.http.post<Combo[]>(environment.apiUrl + this.getSelectedNegocio() + "/combo", combo).toPromise();
      this.sweetalertService.alertSuccess("Genial!", "El combo se guardó correctamente");
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al guardar el combo", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async edit(id:number, combo:Combo): Promise<Combo>{
    try {
      combo.type=Type[Type.Combo];
      const response = await this.http.post<Combo>(environment.apiUrl + this.getSelectedNegocio() + "/combo/" + id,combo).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al guardar el combo", "");
        throw "No se obtuvo respuesta del servidor";
      }else{
        this.sweetalertService.alertSuccess("Genial!", "El combo se editó correctamente");
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al editar el combo", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async delete(id:number): Promise<any>{ 
    try {
      const response = await lastValueFrom<any>(
        this.http.delete(environment.apiUrl + this.getSelectedNegocio() + "/combo/" + id).pipe(take(1))
      );
      this.sweetalertService.alertSuccess("Genial!","El combo se eliminó correctamente");
      return response;
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al eliminar el combo", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  getSelectedNegocio():string{
    //console.log(localStorage.getItem("negocio")! || "");
    //return localStorage.getItem("negocio")! || "";
    console.log(this.loginService.getCookieNegocio())
    return this.loginService.getCookieNegocio();
    //return localStorage.getItem("negocio")! || "";
  }
}
