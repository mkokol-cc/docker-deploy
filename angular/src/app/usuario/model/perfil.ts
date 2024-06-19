import { Rol } from "./rol";
import { Usuario } from "./usuario";

export class Perfil {
	id?:number;
	roles?:Rol[]
	usuarios?:Usuario[];
	nombre?:string;
}
