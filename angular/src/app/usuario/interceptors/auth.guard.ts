import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  try{
    const user = await authService.myAccount();
    return true;
  }catch(error:any){
    router.navigateByUrl("/login");
    return false;
  }
};


export const authGuardComboEditor: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("COMBO_EDITOR")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};
export const authGuardComboViewer: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("COMBO_VIEWER")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};


export const authGuardArticuloEditor: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("ARTICULO_EDITOR")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};
export const authGuardArticuloViewer: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("ARTICULO_VIEWER")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};


export const authGuardGrupoArticuloEditor: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("GRUPO_ARTICULO_EDITOR")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};
export const authGuardGrupoArticuloViewer: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("GRUPO_ARTICULO_VIEWER")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};


export const authGuardVentaEditor: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("VENTA_EDITOR")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};
export const authGuardVentaViewer: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("VENTA_VIEWER")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};


/*USERS ADMIN*/
export const authGuardUsuarioEditor: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("USUARIO_EDITOR")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};
export const authGuardUsuarioViewer: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("USUARIO_VIEWER")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};


export const authGuardPerfilEditor: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("PERFIL_EDITOR")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};
export const authGuardPerfilViewer: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  //if(authService.login())
  if(authService.hasAuthority("PERFIL_VIEWER")){
    return true;
  }
  router.navigateByUrl("/unauthorized");
  return false;
};
