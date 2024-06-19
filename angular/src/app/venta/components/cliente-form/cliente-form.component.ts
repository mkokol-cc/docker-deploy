import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../model/cliente';
import { Observable, map, startWith } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { CondicionIVA } from '../../model/condicion-iva';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    AsyncPipe
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent {
  
  @Input()
  clienteEdit!: Cliente;

  formCliente:FormGroup;
  cliente?:Cliente;
  listCliente?:Cliente[];
  filteredCliente?:Observable<Cliente[]>;
  clienteFilter = new FormControl('');

  condicionIVAEnum = [
    CondicionIVA[CondicionIVA.RESPONSABLE_INSCRIPTO],
    CondicionIVA[CondicionIVA.MONOTRIBUTISTA],
    CondicionIVA[CondicionIVA.CONSUMIDOR_FINAL]
  ];
  
  constructor(private fb:FormBuilder, private clienteService:ClienteService){
    this.formCliente = this.fb.group({
      cuitDni: [,[Validators.required,Validators.min(0),Validators.max(99999999999)]],
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      direccion : [, [Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      telefono : [, [Validators.required,Validators.min(0),Validators.max(99999999999)]],
      condicionIva : [, [Validators.required]],
    });
    this.getListCliente();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clienteEdit'] && changes['clienteEdit'].currentValue) {
      const clienteInputEdit = changes['clienteEdit'].currentValue as Cliente;
      this.select(clienteInputEdit);
    }
  }

  async getListCliente(){
    this.listCliente = await this.clienteService.list();
    //this.filteredCliente = this.clienteFilter.valueChanges.pipe(
    this.filteredCliente = this.formCliente.get('cuitDni')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterListCliente(value || '')),
    );
  }

  private _filterListCliente(value: string): Cliente[] {
    const filterValue = value.toString().toLowerCase();
    return this.listCliente?.filter(cli => cli.cuitDni?.toString().toLowerCase().includes(filterValue)) || [];
  }

  select(cliente:Cliente){
    this.formCliente.patchValue({
      cuitDni: cliente.cuitDni,
      nombre: cliente.nombre,
      direccion : cliente.direccion,
      telefono : cliente.telefono,
      condicionIva : cliente.condicionIva
    })
  }

  getCliente():Cliente{
    let cuit:number = this.formCliente.get('cuitDni')?.value;
    let clieteSeleccionado = this.listCliente?.find(c => c.cuitDni? c.cuitDni === cuit : false);
    let c = new Cliente();
    c.cuitDni = this.formCliente.get('cuitDni')?.value;
    c.condicionIva = this.formCliente.get('condicionIva')?.value;
    c.nombre = this.formCliente.get('nombre')?.value;
    c.telefono = this.formCliente.get('telefono')?.value;
    c.direccion = this.formCliente.get('direccion')?.value;
    if(this.clienteEdit){
      c.id = this.clienteEdit.id;
    }
    if(clieteSeleccionado){
      c.id = clieteSeleccionado.id;
      c.cuitDni = clieteSeleccionado.cuitDni;
    }
    console.log("formCliente.getCliente");
    console.log(c);
    return c
  }

  edit(){
    Swal.fire({
      title: "Seguro que quieres editar el cliente?",
      text: "El cliente "+this.clienteEdit.cuitDni+" se cambiara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, editar!"
    }).then((result) => {
      if (result.isConfirmed) {
        const c = this.getCliente();
        c.id? this.clienteService.edit(c.id,c) : null;
        Swal.fire({
          title: "Editado!",
          text: "El cliente se editó correctamente.",
          icon: "success"
        });
      }
    });
  }

}
