import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Combo } from '../../model/combo';
import { ComboService } from '../../services/combo.service';
import { ArticuloCombo } from '../../model/articulo-combo';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../model/articulo';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { OnlyNumbersDirective } from '../../../directives/only-numbers.directive';

@Component({
  selector: 'app-combo-form-new',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent,
    OnlyNumbersDirective
  ],
  templateUrl: './combo-form-new.component.html',
  styleUrl: './combo-form-new.component.css'
})
export class ComboFormNewComponent {

  @Input()
  comboEdit!: Combo;

  isLoading:boolean = false;
  comboNew:Combo = new Combo();
  listArticuloCombo:ArticuloCombo[] = [];
  listArticulo:Articulo[] = []
  formNewCombo:FormGroup;
  formNewSingleArticuloCombo:FormGroup;
  
  constructor(private comboService:ComboService, private articuloService:ArticuloService,
    private fb:FormBuilder) {
    this.formNewCombo = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      codigo : ['', [Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      porcentajeRecargoSinIVA: [,[Validators.required,Validators.min(0),Validators.max(9999)]],
      porcentajeRecargoConIVA : [, [Validators.required,Validators.min(0),Validators.max(9999)]],
      porcentajeRecargoTarjeta : [, [Validators.required,Validators.min(0),Validators.max(9999)]],
      porcentajeRecargoTarjeta3Cuotas : [, [Validators.required,Validators.min(0),Validators.max(9999)]],
      porcentajeRecargoTarjeta6Cuotas : [, [Validators.required,Validators.min(0),Validators.max(9999)]],
    });
    this.formNewSingleArticuloCombo = this.fb.group({
      articulo: [,[Validators.required]],
      cantidad: [,[Validators.required,Validators.min(1),Validators.max(9999)]],
    });
    this.getListaArticulos();
  }

  createFormNewArticuloCombo(): FormGroup {
    return this.fb.group({
      articulo: [,[Validators.required]],
      cantidad: [,[Validators.required,Validators.min(1),Validators.max(9999)]],
    });
  }

  createFormNewArticuloComboEdit(articuloCombo:ArticuloCombo): FormGroup {
    const newForm = this.fb.group({
      articulo: [0,[Validators.required]],
      cantidad: [0,[Validators.required,Validators.min(1),Validators.max(9999)]],
    });
    if(articuloCombo.articulo && articuloCombo.cantidad){
      newForm.patchValue({
        articulo: articuloCombo.articulo.id,
        cantidad: articuloCombo.cantidad
      })       
    }
    return newForm;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comboEdit'] && changes['comboEdit'].currentValue) {
      const comboEdit = changes['comboEdit'].currentValue as Combo;
      this.formNewCombo.patchValue({
        nombre: comboEdit.nombre,
        codigo: comboEdit.codigo,
        porcentajeRecargoConIVA: comboEdit.porcentajeRecargoConIVA,
        porcentajeRecargoSinIVA: comboEdit.porcentajeRecargoSinIVA,
        porcentajeRecargoTarjeta: comboEdit.porcentajeRecargoTarjeta,
        porcentajeRecargoTarjeta3Cuotas: comboEdit.porcentajeRecargoTarjeta3Cuotas,
        porcentajeRecargoTarjeta6Cuotas: comboEdit.porcentajeRecargoTarjeta6Cuotas,
      });
      this.listArticuloCombo = comboEdit.articulos ? comboEdit.articulos : [];
    }
  }

  async getListaArticulos(){
    this.listArticulo = await this.articuloService.list();
  }

  addArticuloCombo(){
    //this.formNewArticuloCombo.push(this.createFormNewArticuloCombo());
    let ac = new ArticuloCombo();
    ac.articulo = this.listArticulo.find(a => a.id == this.formNewSingleArticuloCombo.get('articulo')?.value);
    //ac.articulo.id = this.formNewSingleArticuloCombo.get('articulo')?.value;
    ac.cantidad = this.formNewSingleArticuloCombo.get('cantidad')?.value;
    this.listArticuloCombo.push(ac);
    this.formNewSingleArticuloCombo.reset();
  }

  deleteArticuloCombo(ac:ArticuloCombo){
    this.listArticuloCombo = this.listArticuloCombo.filter(a => a !== ac);
  }

  onSubmit(){
    this.comboNew = this.setFormDataArticuloCombo(this.comboNew)
    console.log(this.comboNew);
    if(this.comboEdit){
      if(this.comboEdit.id!==undefined){
        this.comboNew.id = this.comboEdit.id;
        this.edit(this.comboNew.id,this.comboNew);
      }
    }else{
      this.save(this.comboNew);
      this.clear();
    }
  }

  async edit(id:number,combo:Combo){
    console.log("Voy a guardar (Editar en realidad) Esto:")
    console.log(combo)
    this.isLoading = true;
    await this.comboService.edit(id,combo);
    this.isLoading = false;
  }

  async save(combo:Combo){
    console.log("Voy a guardar Esto:")
    console.log(combo)
    this.isLoading = true;
    await this.comboService.new(combo);
    this.isLoading = false;
  }

  setFormDataArticuloCombo(combo:Combo):Combo{
    combo = this.formNewCombo.value;
    combo.articulos=this.listArticuloCombo;
    return combo;
  }

  clear(){
    this.formNewCombo.reset();
  }

  delete(){
    this.isLoading = true;
    if(this.comboEdit.id!==undefined){
      this.comboService.delete(this.comboEdit.id);
    }
    this.isLoading = false;
  }
}
