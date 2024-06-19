import { BaseItem } from "../../articulo/model/base-item";
import { Venta } from "./venta";

export class DetalleVenta {
	id?:number;
	precioUnitario?:number;
	cantidad?:number;
	item?:BaseItem;
	venta?:Venta;
}
