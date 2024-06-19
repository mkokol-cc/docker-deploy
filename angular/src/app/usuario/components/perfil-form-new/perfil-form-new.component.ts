import { Component, Input, SimpleChanges } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../model/rol';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Perfil } from '../../model/perfil';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-perfil-form-new',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTooltipModule,
    LoaderComponent
  ],
  templateUrl: './perfil-form-new.component.html',
  styleUrl: './perfil-form-new.component.css'
})
export class PerfilFormNewComponent {

  listRol:Rol[] = [];
  listRolChbx:any[] = [];
  formNewPerfil: FormGroup;
  newPerfil:Perfil = new Perfil();
  
  isLoading:boolean = false;

  @Input()
  perfilEdit!: Perfil;

  constructor(private perfilService:PerfilService, private rolService:RolService, 
    private fb: FormBuilder){
    
    this.getListRol();
    this.formNewPerfil = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['perfilEdit'] && changes['perfilEdit'].currentValue) {
      console.log("CAMBIE")
      const p = changes['perfilEdit'].currentValue as Perfil;
      this.formNewPerfil.patchValue({
        nombre: p.nombre
      })
      this.getListRolChbx();
    }
  }

  ngOnInit(){
    this.getListRol();
  }

  async getListRol(){
    this.isLoading = true;
    this.listRol = await this.rolService.list();
    console.log(this.listRol);
    this.getListRolChbx()
    this.isLoading = false;
  }

  getListRolChbx(){
    this.listRolChbx = []
    this.listRol.forEach(r=>{
      this.listRolChbx?.push({
        rol:r,
        checked:false
      })
    })
    if(this.perfilEdit){
      this.listRolChbx?.forEach(r=>{
        if(this.perfilEdit.roles?.find(rol => rol.id == r.rol.id)){
          r.checked = true;
        }else{
          r.checked = false;
        }
      })
    }
  }

  getListSelectedRol():Rol[]{
    let listAux:Rol[] = [];
    this.listRolChbx?.forEach(r=>{
      if(r.checked){
        listAux.push(r.rol);
      }
    })
    return listAux;
  }

  isSelectedRol(rol:Rol):boolean{
    if(this.listRol.find(r=>r.id == rol.id)){
      return true;
    }
    return false;
  }
 
  onSubmit(){
    this.newPerfil.nombre = this.formNewPerfil.get('nombre')?.value;
    this.newPerfil.roles = this.getListSelectedRol();
    console.log(this.newPerfil);
    //this.perfilService.new(this.newPerfil);
  }

  samePermisos():boolean{
    let listAux:Rol[] = this.getListSelectedRol();
    if (listAux.length == this.perfilEdit.roles?.length) {
      let aux = true;
      listAux.forEach(r=>{
        if(!this.perfilEdit.roles?.some(obj => r.id == obj.id)){
          aux=false;
        }
      })
      return aux;
    }
    return false;
  }
  

}
