import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, take } from 'rxjs';
import { Venta } from '../model/venta';
import { SweetalertService } from '../../services/sweetalert.service';
import { environment } from '../../../environments/environment.prod';
import { LoginService } from '../../usuario/services/login.service';
import { Combo } from '../../articulo/model/combo';
import { Articulo } from '../../articulo/model/articulo';
import { BaseItem } from '../../articulo/model/base-item';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  
  constructor(private http:HttpClient, private sweetalertService:SweetalertService, private loginService:LoginService) { }

  async count(
    busqueda:string = '',			
    fechaInicio:string = '',//formato YYYY-MM-DD o 2024-05-22
    fechaFin:string = ''
  ):Promise<number>{
    let params = new HttpParams()
    .set('busqueda', busqueda)
    .set('fechaInicio', fechaInicio.toString())
    .set('fechaFin', fechaFin.toString());
    try {
      const response = await this.http.get<number>(environment.apiUrl.toString() + this.getSelectedNegocio() + "/venta/count",{params}).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener las ventas", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error);
      this.sweetalertService.alertError("Error al obtener las ventas", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async list(
    page:number = 0,
    size:number = 5,
    asc:boolean = false,
    porFechaHora:boolean = false,
    porTotalVta:boolean = false,
    busqueda:string = '',			
    fechaInicio:string = '',//formato YYYY-MM-DD o 2024-05-22
    fechaFin:string = ''
  ):Promise<Venta[]>{
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('asc', asc.toString())
    .set('porFechaHora', porFechaHora.toString())
    .set('porTotalVta', porTotalVta.toString())
    .set('busqueda', busqueda)
    .set('fechaInicio', fechaInicio.toString())
    .set('fechaFin', fechaFin.toString());
    try {
      const response = await this.http.get<Venta[]>(environment.apiUrl + this.getSelectedNegocio() + "/venta",{params}).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener las ventas", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al obtener las ventas", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async new(venta:Venta): Promise<void>{
    console.log("-----------------------")
    console.log(this.formatedVentaObject(venta));
    console.log("-----------------------")
    try {
      await this.http.post<Venta[]>(environment.apiUrl + this.getSelectedNegocio() + "/venta", this.formatedVentaObject(venta)).toPromise();
      this.sweetalertService.alertSuccess("Genial!", "La venta se guardó correctamente");
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al guardar la venta", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async delete(id:number): Promise<any>{ 
    try {
      const response = await lastValueFrom<any>(
        this.http.delete(environment.apiUrl + this.getSelectedNegocio() + "/venta/" + id).pipe(take(1))
      );
      this.sweetalertService.alertSuccess("Genial!","La venta se eliminó correctamente");
      return response;
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al eliminar la venta", error.error + " (" + error.status + ")");
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  async getBaseItem(codigo:string):Promise<BaseItem>{
    let params = new HttpParams()
    .set('codigo', codigo);
    try {
      const response = await this.http.get<BaseItem>(environment.apiUrl + this.getSelectedNegocio() + "/venta/item",{params}).toPromise();
      if(response === undefined){
        this.sweetalertService.alertError("Error al obtener el item ("+codigo+")", "No se obtuvo respuesta del servidor");
        throw "No se obtuvo respuesta del servidor";
      }else{
        return response;
      }
    } catch (error:any) {
      console.log(error)
      this.sweetalertService.alertError("Error al obtener el item ("+codigo+")", "Comprueba que el código sea correcto");//error.error + " (" + error.status + ")"
      console.log(error.error + " (" + error.status + ")")
      throw error; // Re-lanzar el error para que el componente pueda manejarlo si es necesario
    }
  }

  getSelectedNegocio():string{
    console.log(this.loginService.getCookieNegocio())
    return this.loginService.getCookieNegocio();
  }

  formatedVentaObject(vta:Venta):any{
    return {
      cliente:vta.cliente,
      detalleVenta:vta.detalleVenta,
      tipoPago:vta.tipoPago,
      fechaHora: this.toLocalISOString(vta.fechaHora ? vta.fechaHora : new Date())
    }
  }

  toLocalISOString(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
  

}
