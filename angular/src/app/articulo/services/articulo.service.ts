import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom, take } from 'rxjs';
import { Articulo } from '../model/articulo';
import { SweetalertService } from '../../services/sweetalert.service';
import { Type } from '../model/type';
import { environment } from '../../../environments/environment.prod';
import { LoginService } from '../../usuario/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient, private sweetalertService:SweetalertService, private loginService:LoginService) { }

  
  async count(busqueda: string = ''):Promise<number>{
      let params = new HttpParams()
      .set('busqueda', busqueda);
    try {
      const response = await this.http.get<number>(environment.apiUrl.toString() + this.getSelectedNegocio() + "/articulo/count",{params}).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener los artículos", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error);
      this.sweetalertService.alertError("Error al obtener los artículos", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async list(page: number = 0, size: number = 10, asc: boolean = false, 
    porNombre: boolean = false, porPrecioCompra: boolean = false, 
    porCodigo: boolean = false, busqueda: string = ''):Promise<Articulo[]>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('asc', asc.toString())
      .set('porNombre', porNombre.toString())
      .set('porPrecioCompra', porPrecioCompra.toString())
      .set('porCodigo', porCodigo.toString())
      .set('busqueda', busqueda);
    try {
      const response = await this.http.get<Articulo[]>(environment.apiUrl.toString() + this.getSelectedNegocio() + "/articulo",{params}).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener los artículos", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error);
      this.sweetalertService.alertError("Error al obtener los artículos", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async new(articulo:Articulo): Promise<void>{
    try {
      articulo.type=Type[Type.Item];
      await this.http.post<Articulo[]>(environment.apiUrl.toString() + this.getSelectedNegocio() + "/articulo", articulo).toPromise();
      this.sweetalertService.alertSuccess("Genial!", "El artículo se guardó correctamente");
    } catch (error:any) {
      console.log(error);
      this.sweetalertService.alertError("Error al guardar el artículo", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async edit(id:number, articulo:Articulo): Promise<Articulo>{
    try {
      articulo.type=Type[Type.Item];
      const response = await this.http.post<Articulo>(environment.apiUrl.toString() + this.getSelectedNegocio() + "/articulo/" + id,articulo).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al guardar el artículo", "");
        throw "No se obtuvo respuesta del servidor";
      }else{
        this.sweetalertService.alertSuccess("Genial!", "El artículo se editó correctamente");
        return response;
      }
    } catch (error:any) {
      console.log(error);
      this.sweetalertService.alertError("Error al editar el artículo", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async delete(id:number): Promise<any>{ 
    try {
      const response = await lastValueFrom<any>(
        this.http.delete(environment.apiUrl.toString() + this.getSelectedNegocio() + "/articulo/" + id).pipe(take(1))
      );
      this.sweetalertService.alertSuccess("Genial!","El artículo se eliminó correctamente");
      return response;
    } catch (error:any) {
      console.log(error);
      this.sweetalertService.alertError("Error al eliminar el artículo", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  getSelectedNegocio():string{
    console.log(this.loginService.getCookieNegocio())
    return this.loginService.getCookieNegocio();
  }
  
}
