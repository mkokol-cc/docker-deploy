import { Negocio } from "../../articulo/model/negocio";
import { Cliente } from "./cliente";
import { DetalleVenta } from "./detalle-venta";
import { TipoPago } from "./tipo-pago";

export class Venta {
	id?:number;

	fechaHora?:Date;
    
	tipoPago?:TipoPago;
	detalleVenta:DetalleVenta[] = [];
	cliente?:Cliente;
	negocio?:Negocio;
}
