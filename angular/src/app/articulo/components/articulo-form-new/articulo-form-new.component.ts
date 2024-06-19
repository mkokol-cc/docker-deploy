import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Articulo } from '../../model/articulo';
import { ArticuloService } from '../../services/articulo.service';
import { CommonModule } from '@angular/common';
import { GrupoArticuloService } from '../../services/grupo-articulo.service';
import { GrupoArticulo } from '../../model/grupo-articulo';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { OnlyPricesDirective } from '../../../directives/only-prices.directive';
import { OnlyNumbersDirective } from '../../../directives/only-numbers.directive';
import { ImageInputFormComponent } from '../image-input-form/image-input-form.component';

@Component({
  selector: 'app-articulo-form-new',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent,
    OnlyNumbersDirective,
    OnlyPricesDirective,
    ImageInputFormComponent
  ],
  templateUrl: './articulo-form-new.component.html',
  styleUrl: './articulo-form-new.component.css'
})
export class ArticuloFormNewComponent {
  @Input()
  articuloEdit!: Articulo;

  @ViewChild(ImageInputFormComponent)
  imageInputForm!: ImageInputFormComponent;

  isLoading:boolean = false;
  articuloNew:Articulo = new Articulo();
  listGrupoArticulo?:GrupoArticulo[] = [];
  formNewArticulo:FormGroup;
  
  constructor(private articuloService:ArticuloService,
    private grupoArticuloService:GrupoArticuloService,private fb:FormBuilder) {
    this.formNewArticulo = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      descripcion: [''],
      codigo : ['', [Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      precioCompra : [, [Validators.required,Validators.min(0),Validators.max(9999999)]],
      stock : [, [Validators.required,Validators.min(0),Validators.max(9999999)]],
      grupoArticulo : [, [Validators.required]],
    });
    this.getListGrupoArticulo();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['articuloEdit'] && changes['articuloEdit'].currentValue) {
      const articuloEdit = changes['articuloEdit'].currentValue as Articulo;
      this.formNewArticulo.patchValue({
        nombre: articuloEdit.nombre,
        descripcion: articuloEdit.descripcion,
        codigo: articuloEdit.codigo,
        precioCompra: articuloEdit.precioCompra?.toString().replace(".",","),
        stock: articuloEdit.stock,
        grupoArticulo: articuloEdit.grupoArticulo?.id,
      });
    }
  }

  async getListGrupoArticulo(){
    this.isLoading = true;
    this.listGrupoArticulo = await this.grupoArticuloService.list();
    this.isLoading = false;
  }

  onSubmit(){

    if(this.formNewArticulo.get('grupoArticulo')){
      let grupoArticulo:GrupoArticulo = new GrupoArticulo();
      this.articuloNew = this.formNewArticulo.value;
      this.articuloNew.precioCompra = this.formNewArticulo.get('precioCompra')?.value.replace(",",".")
      grupoArticulo.id = this.formNewArticulo.get('grupoArticulo')?.value
      this.articuloNew.grupoArticulo = grupoArticulo;
      this.articuloNew.imagenes = this.imageInputForm.webpImages
      console.log(this.articuloNew);
      if(this.articuloEdit){
        if(this.articuloEdit.id!==undefined){
          this.articuloNew.id = this.articuloEdit.id;
          this.edit(this.articuloNew.id,this.articuloNew);
        }
      }else{
        console.log("Voy a guardar lo sgte")
        console.log(this.articuloNew)
        this.save(this.articuloNew);
        this.clear();
      }
    }
  }

  async edit(id:number,articulo:Articulo){
    this.isLoading = true;
    await this.articuloService.edit(id,articulo);
    this.isLoading = false;
  }

  async save(articulo:Articulo){
    this.isLoading = true;
    await this.articuloService.new(articulo);
    this.isLoading = false;
  }

  clear(){
    this.formNewArticulo.reset();
  }

  delete(){
    this.isLoading = true;
    if(this.articuloEdit.id!==undefined){
      this.articuloService.delete(this.articuloEdit.id);
    }
    this.isLoading = false;
  }

}
