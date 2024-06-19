import { Articulo } from "./articulo";
import { Negocio } from "./negocio";

export class GrupoArticulo {

	id? : number;
	nombre? : string;
	porcentajeRecargoSinIVA? : number;
	porcentajeRecargoConIVA? : number;
	porcentajeRecargoTarjeta? : number;
	porcentajeRecargoTarjeta3Cuotas? : number;
	porcentajeRecargoTarjeta6Cuotas? : number;
	negocio? : Negocio;
	articulos? : Articulo[];

	constructor(){}
}
