import { Component, Input, SimpleChanges } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from '../../model/perfil';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../model/usuario';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-usuario-form-new',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './usuario-form-new.component.html',
  styleUrl: './usuario-form-new.component.css'
})
export class UsuarioFormNewComponent {
  
  listPerfil?:Perfil[];
  formNewUsuario:FormGroup;
  newUsuario:Usuario = new Usuario();
  isLoading:boolean = false;

  @Input()
  usuarioEdit!: Usuario;

  constructor(private perfilService:PerfilService, private fb:FormBuilder, 
    private usaurioService:UsuarioService){
    this.getListPerfil();
    this.formNewUsuario = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      clave: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
      perfil : [, [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuarioEdit'] && changes['usuarioEdit'].currentValue) {
      const u = changes['usuarioEdit'].currentValue as Usuario;
      this.formNewUsuario.patchValue({
        nombre: u.nombre,
        perfil : u.perfil?.id
      })
      console.log()
    }
  }

  async getListPerfil(){
    this.isLoading = true;
    this.listPerfil = await this.perfilService.list();
    this.isLoading = false;
  }

  onSubmit(){
    this.isLoading = true;
    if(this.usuarioEdit){
      this.newUsuario = this.edit();
    }else{
      this.newUsuario.clave = this.formNewUsuario.get('clave')?.value;
    }
    this.newUsuario.nombre = this.formNewUsuario.get('nombre')?.value;
    let p = new Perfil();
    p.id = this.formNewUsuario.get('perfil')?.value;
    this.newUsuario.perfil = p;
    console.log(this.newUsuario);
    this.usaurioService.new(this.newUsuario);
    this.isLoading = false;
  }

  edit():Usuario{
    let uReq = new Usuario();
    uReq.id = this.usuarioEdit.id;
    if(this.formNewUsuario.get('clave')?.invalid){
      uReq.clave = this.usuarioEdit.clave;
    }else{
      uReq.clave = this.formNewUsuario.get('clave')?.value
    }
    return uReq;
  }

}
