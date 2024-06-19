import { Authority } from "./authority";
import { Perfil } from "./perfil";

export class Usuario {

	id?:number;
	perfil?:Perfil;
	nombre?:string;
	clave?:string;
	authorities:Authority[] = [];

}
