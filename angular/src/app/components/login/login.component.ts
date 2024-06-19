import { Component } from '@angular/core';
import { LoginService } from '../../usuario/services/login.service';
import { Usuario } from '../../usuario/model/usuario';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    //FormsModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  userLogin:Usuario = new Usuario()
  formLogin:FormGroup;
  isLoading:boolean = false;

  constructor(private loginService:LoginService, private fb:FormBuilder, private router:Router){
    this.formLogin = this.fb.group({
      user: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      password: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]]
    });
  }

  getUserData(){
    this.userLogin.nombre = this.formLogin.get('user')?.value;
    this.userLogin.clave = this.formLogin.get('password')?.value;
    //alert("Me voy a loguear: "+this.formLogin.get('user')?.value +" - "+this.formLogin.get('password')?.value)
  }

  async login(){
    this.isLoading = true;
    try{
      this.getUserData();
      await this.loginService.logout();
      await this.loginService.login(this.userLogin);
      await this.loginService.myAccount();
      await this.loginService.setDefaultSite();
      this.router.navigateByUrl("/dashboard/home");
    }catch(e){
    }
    this.isLoading = false;
  }

}
