import { DetalleVenta } from "../../venta/model/detalle-venta";
import { TipoPago } from "../../venta/model/tipo-pago";
import { ArticuloCombo } from "./articulo-combo";
import { BaseItem } from "./base-item";
import { GrupoArticulo } from "./grupo-articulo";
import { Imagen } from "./imagen";
import { Negocio } from "./negocio";
import { Type } from "./type";

export class Articulo implements BaseItem{


    id?:number;
	nombre?:string;
	descripcion?:string;
	type?:string;
	codigo?:string;
	negocio?:Negocio;
	detallesVentas?:DetalleVenta[];
	precioCompra? : number;

    imagenes:Imagen[]=[];

    stock? : number;
    grupoArticulo? : GrupoArticulo;
    combo? : ArticuloCombo[];

    constructor(){}

    setArticulo(obj:any){
        this.id=obj.id;
        this.nombre=obj.nombre;
        this.descripcion=obj.descripcion;
        this.type=obj.type;
        this.codigo=obj.codigo;
        this.negocio=obj.negocio;
        this.detallesVentas=obj.detallesVentas;
        this.precioCompra=obj.precioCompra;
        this.stock=obj.stock;
        this.grupoArticulo=obj.grupoArticulo;
        this.combo=obj.combo;
    }

    calcularPrecioPorTipoPago(tipoPago: TipoPago): number {
        console.log(tipoPago);
        switch (tipoPago) {
            case 0:
                if (this.grupoArticulo?.porcentajeRecargoSinIVA && this.precioCompra) {
                    return Number((((this.grupoArticulo?.porcentajeRecargoSinIVA /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
            case 1:
                if (this.grupoArticulo?.porcentajeRecargoConIVA && this.precioCompra) {
                    return Number((((this.grupoArticulo?.porcentajeRecargoConIVA /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
            case 2:
                if (this.grupoArticulo?.porcentajeRecargoTarjeta && this.precioCompra) {
                    return Number((((this.grupoArticulo?.porcentajeRecargoTarjeta /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
            case 3:
                if (this.grupoArticulo?.porcentajeRecargoTarjeta3Cuotas && this.precioCompra) {
                    return Number((((this.grupoArticulo?.porcentajeRecargoTarjeta3Cuotas /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
            case 4:
                if (this.grupoArticulo?.porcentajeRecargoTarjeta6Cuotas && this.precioCompra) {
                    return Number((((this.grupoArticulo?.porcentajeRecargoTarjeta6Cuotas /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
        }
        return 0;
    }
    
}
