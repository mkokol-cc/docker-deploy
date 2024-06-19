import { Component, Input, SimpleChanges } from '@angular/core';
import { GrupoArticulo } from '../../model/grupo-articulo';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GrupoArticuloService } from '../../services/grupo-articulo.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { OnlyNumbersDirective } from '../../../directives/only-numbers.directive';
import { OnlyPricesDirective } from '../../../directives/only-prices.directive';

@Component({
  selector: 'app-grupo-articulo-form-new',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent,
    OnlyNumbersDirective,
    OnlyPricesDirective
  ],
  templateUrl: './grupo-articulo-form-new.component.html',
  styleUrl: './grupo-articulo-form-new.component.css'
})
export class GrupoArticuloFormNewComponent {

  @Input()
  grupoArticuloEdit!: GrupoArticulo;

  grupoArticuloNew:GrupoArticulo = new GrupoArticulo();
  formNewGrupoArticulo:FormGroup;
  isLoading:boolean = false;
  
  constructor(private grupoArticuloService:GrupoArticuloService,private fb:FormBuilder) {
    this.formNewGrupoArticulo = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      porcentajeRecargoSinIVA: [,[Validators.required,Validators.min(0),Validators.max(9999)]],
      porcentajeRecargoConIVA : [, [Validators.required,Validators.min(0),Validators.max(9999)]],
      porcentajeRecargoTarjeta : [, [Validators.required,Validators.min(0),Validators.max(9999)]],
      porcentajeRecargoTarjeta3Cuotas : [, [Validators.required,Validators.min(0),Validators.max(9999)]],
      porcentajeRecargoTarjeta6Cuotas : [, [Validators.required,Validators.min(0),Validators.max(9999)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['grupoArticuloEdit'] && changes['grupoArticuloEdit'].currentValue) {
      const grupoArticuloEdit = changes['grupoArticuloEdit'].currentValue as GrupoArticulo;
      this.formNewGrupoArticulo.patchValue({
        nombre: grupoArticuloEdit.nombre,
        porcentajeRecargoSinIVA: grupoArticuloEdit.porcentajeRecargoSinIVA,
        porcentajeRecargoConIVA: grupoArticuloEdit.porcentajeRecargoConIVA,
        porcentajeRecargoTarjeta: grupoArticuloEdit.porcentajeRecargoTarjeta,
        porcentajeRecargoTarjeta3Cuotas: grupoArticuloEdit.porcentajeRecargoTarjeta3Cuotas,
        porcentajeRecargoTarjeta6Cuotas: grupoArticuloEdit.porcentajeRecargoTarjeta6Cuotas,
      });
    }
  }

  onSubmit(){
    this.grupoArticuloNew = this.formNewGrupoArticulo.value;
    if(this.grupoArticuloEdit){
      if(this.grupoArticuloEdit.id!==undefined){
        this.grupoArticuloNew.id = this.grupoArticuloEdit.id;
        this.edit(this.grupoArticuloNew.id,this.grupoArticuloNew);
      }
    }else{
      this.save(this.grupoArticuloNew);
      this.clear();
    }
  }

  async edit(id:number,grupoArticulo:GrupoArticulo){
    this.isLoading = true;
    await this.grupoArticuloService.edit(id,grupoArticulo);
    this.isLoading = false;
  }

  async save(grupoArticulo:GrupoArticulo){
    this.isLoading = true;
    await this.grupoArticuloService.new(grupoArticulo);
    this.isLoading = false;
  }

  clear(){
    this.formNewGrupoArticulo.reset();
  }

  delete(){
    this.isLoading = true;
    if(this.grupoArticuloEdit.id!==undefined){
      this.grupoArticuloService.delete(this.grupoArticuloEdit.id);
    }
    this.isLoading = false;
  }
}
