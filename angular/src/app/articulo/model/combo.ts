import { DetalleVenta } from "../../venta/model/detalle-venta";
import { TipoPago } from "../../venta/model/tipo-pago";
import { ArticuloCombo } from "./articulo-combo";
import { BaseItem } from "./base-item";
import { Negocio } from "./negocio";
import { Type } from "./type";

export class Combo implements BaseItem{


    id?:number;
	nombre?:string;
	descripcion?:string;
	type?:string;
	codigo?:string;
	negocio?:Negocio;
	detallesVentas?:DetalleVenta[];
	precioCompra? : number;




	porcentajeRecargoSinIVA? : number;
	porcentajeRecargoConIVA? : number;
	porcentajeRecargoTarjeta? : number;
	porcentajeRecargoTarjeta3Cuotas? : number;
	porcentajeRecargoTarjeta6Cuotas? : number;
	articulos? : ArticuloCombo[];

    constructor(){
    }

    setCombo(obj:any){
        this.id=obj.id;
        this.nombre=obj.nombre;
        this.descripcion=obj.descripcion;
        this.type=obj.type;
        this.codigo=obj.codigo;
        this.negocio=obj.negocio;
        this.detallesVentas=obj.detallesVentas;
        this.precioCompra=obj.precioCompra;

        this.porcentajeRecargoSinIVA= obj.porcentajeRecargoSinIVA;
        this.porcentajeRecargoConIVA= obj.porcentajeRecargoConIVA;
        this.porcentajeRecargoTarjeta= obj.porcentajeRecargoTarjeta;
        this.porcentajeRecargoTarjeta3Cuotas= obj.porcentajeRecargoTarjeta3Cuotas;
        this.porcentajeRecargoTarjeta6Cuotas= obj.porcentajeRecargoTarjeta6Cuotas;
        this.articulos= obj.articulos;
    }

    calcularPrecioPorTipoPago(tipoPago: TipoPago): number {
        console.log(tipoPago);
        switch (tipoPago) {
            case 0:
                if (this.porcentajeRecargoSinIVA && this.precioCompra) {
                    return Number((((this.porcentajeRecargoSinIVA /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
            case 1:
                if (this.porcentajeRecargoConIVA && this.precioCompra) {
                    return Number((((this.porcentajeRecargoConIVA /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
            case 2:
                if (this.porcentajeRecargoTarjeta && this.precioCompra) {
                    return Number((((this.porcentajeRecargoTarjeta /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
            case 3:
                if (this.porcentajeRecargoTarjeta3Cuotas && this.precioCompra) {
                    return Number((((this.porcentajeRecargoTarjeta3Cuotas /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
            case 4:
                if (this.porcentajeRecargoTarjeta6Cuotas && this.precioCompra) {
                    return Number((((this.porcentajeRecargoTarjeta6Cuotas /100) + 1) * this.precioCompra).toFixed(2));
                }
                break;
        }
        return 0;
    }
}
