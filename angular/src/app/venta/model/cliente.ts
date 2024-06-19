import { CondicionIVA } from "./condicion-iva";
import { Venta } from "./venta";

export class Cliente {
	id?:number;
	cuitDni?:number;
	nombre?:string;//nombre y apellido en caso de personas
	direccion?:string;
	telefono?:number;
    
	ventas?:Venta[];
	condicionIva?:CondicionIVA;
}
