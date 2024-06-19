import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VentaTableComponent } from './venta/components/venta-table/venta-table.component';
import { VentaFormNewComponent } from './venta/components/venta-form-new/venta-form-new.component';
import { GrupoArticuloTableComponent } from './articulo/components/grupo-articulo-table/grupo-articulo-table.component';
import { GrupoArticuloFormNewComponent } from './articulo/components/grupo-articulo-form-new/grupo-articulo-form-new.component';
import { ComboFormNewComponent } from './articulo/components/combo-form-new/combo-form-new.component';
import { ComboTableComponent } from './articulo/components/combo-table/combo-table.component';
import { ArticuloFormNewComponent } from './articulo/components/articulo-form-new/articulo-form-new.component';
import { ArticuloTableComponent } from './articulo/components/articulo-table/articulo-table.component';
import { Prueba } from './components/prueba/prueba.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard, authGuardArticuloEditor, authGuardArticuloViewer, 
    authGuardComboEditor, authGuardComboViewer, authGuardGrupoArticuloEditor, 
    authGuardGrupoArticuloViewer, authGuardVentaEditor, authGuardVentaViewer, 
    authGuardPerfilEditor, authGuardPerfilViewer, authGuardUsuarioEditor, authGuardUsuarioViewer 
} from './usuario/interceptors/auth.guard';
import { UsuarioTableComponent } from './usuario/components/usuario-table/usuario-table.component';
import { UsuarioFormNewComponent } from './usuario/components/usuario-form-new/usuario-form-new.component';
import { PerfilTableComponent } from './usuario/components/perfil-table/perfil-table.component';
import { PerfilFormNewComponent } from './usuario/components/perfil-form-new/perfil-form-new.component';
import { HomeComponent } from './components/home/home.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { ImageInputFormComponent } from './articulo/components/image-input-form/image-input-form.component';

export const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate:[authGuard], children:[

        {path: 'home', component: HomeComponent, pathMatch: 'full'},

        {path: 'ventas', component: VentaTableComponent, canActivate:[authGuardVentaViewer], pathMatch: 'full'},
        {path: 'ventas/new', component: VentaFormNewComponent, canActivate:[authGuardVentaEditor], pathMatch: 'full'},
        {path: 'articulos', component: ArticuloTableComponent, canActivate:[authGuardArticuloViewer], pathMatch: 'full'},
        {path: 'articulos/new', component: ArticuloFormNewComponent, canActivate:[authGuardArticuloEditor], pathMatch: 'full'},
        {path: 'combos', component: ComboTableComponent, canActivate:[authGuardComboViewer], pathMatch: 'full'},
        {path: 'combos/new', component: ComboFormNewComponent, canActivate:[authGuardComboEditor], pathMatch: 'full'},
        {path: 'grupos', component: GrupoArticuloTableComponent, canActivate:[authGuardGrupoArticuloViewer], pathMatch: 'full'},
        {path: 'grupos/new', component: GrupoArticuloFormNewComponent, canActivate:[authGuardGrupoArticuloEditor], pathMatch: 'full'},

        {path: 'usuarios', component: UsuarioTableComponent, canActivate:[authGuardUsuarioViewer], pathMatch: 'full'},
        {path: 'usuarios/new', component: UsuarioFormNewComponent, canActivate:[authGuardUsuarioEditor], pathMatch: 'full'},
        {path: 'perfiles', component: PerfilTableComponent, canActivate:[authGuardPerfilEditor], pathMatch: 'full'},
        {path: 'perfiles/new', component: PerfilFormNewComponent, canActivate:[authGuardPerfilViewer], pathMatch: 'full'}
    ]},
    {path: 'unauthorized', component:NotAuthorizedComponent},
    {path: 'prueba', component:Prueba},
    {path: 'login', component:LoginComponent},
    {path: '**', component:PageNotFoundComponent}
];
