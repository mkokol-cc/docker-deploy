import { Component, EventEmitter, Output } from '@angular/core';
import { Combo } from '../../../articulo/model/combo';
import { Articulo } from '../../../articulo/model/articulo';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../services/venta.service';
import { BaseItem } from '../../../articulo/model/base-item';
import { SweetalertService } from '../../../services/sweetalert.service';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-search-base-item',
  standalone: true,
  imports: [FormsModule,LoaderComponent],
  templateUrl: './search-base-item.component.html',
  styleUrl: './search-base-item.component.css'
})
export class SearchBaseItemComponent {
  
  @Output() baseItemEmitter = new EventEmitter<BaseItem>();
  baseItem?:BaseItem;
  codigo:string="";
  isLoading:boolean = false;

  constructor(private ventaService:VentaService, private alertService:SweetalertService){}

  async find(){
    this.isLoading = true;
    this.baseItem = await this.getBaseItem();
    this.isLoading = false;
    if(this.baseItem!=undefined){
      this.send();
    }else{
      this.alertService.alertError("Error al obtener el Item","Asegurate que el código ("+this.codigo+") sea correcto.");
    }
  }

  async getBaseItem():Promise<BaseItem|undefined>{
    const response = await this.ventaService.getBaseItem(this.codigo);
    if(response!=null && response.type=="Item"){
      let a = new Articulo();
      a.setArticulo(response);
      return a;
    }else if(response!=null && response.type=="Combo"){
      let c = new Combo();
      c.setCombo(response);
      return c;
    }
    return undefined;
  }

  send() {
    this.baseItemEmitter.emit(this.baseItem);
  }
}
