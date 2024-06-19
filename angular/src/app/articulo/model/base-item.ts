import { DetalleVenta } from "../../venta/model/detalle-venta";
import { TipoPago } from "../../venta/model/tipo-pago";
import { Negocio } from "./negocio";

export interface BaseItem {

	id?:number;
	nombre?:string;
	descripcion?:string;
	type?:string;
	codigo?:string;
	negocio?:Negocio;
	detallesVentas?:DetalleVenta[];
	precioCompra? : number;

	calcularPrecioPorTipoPago(tipoPago:TipoPago): number;
}
