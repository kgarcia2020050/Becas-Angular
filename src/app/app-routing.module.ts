import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RouterAdminComponent } from './components/router-admin/router-admin.component';
import { AdminGuard } from './guards/admin.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuariosRegistradosComponent } from './components/usuarios-registrados/usuarios-registrados.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { RouterUsuarioComponent } from './components/router-usuario/router-usuario.component';
import { UsuarioGuard } from './guards/usuario.guard';
import { RouterEmpresaComponent } from './components/router-empresa/router-empresa.component';
import { EmpresaGuard } from './guards/empresa.guard';
import { VistaUsuarioComponent } from './components/vista-usuario/vista-usuario.component';
import { VistaEmpresaComponent } from './components/vista-empresa/vista-empresa.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  {
    path: 'principal',
    component: RouterAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'perfil/:ID', component: PerfilComponent },
      { path: 'registrados', component: UsuariosRegistradosComponent },
      { path: 'administracion', component: AdministracionComponent },
    ],
  },
  {
    path: 'usuario',
    component: RouterUsuarioComponent,
    canActivate: [UsuarioGuard],
    children: [
      { path: 'perfil/:ID', component: PerfilComponent },
      { path: 'inicio', component: VistaUsuarioComponent },
    ],
  },
  {
    path: 'empresas',
    component: RouterEmpresaComponent,
    canActivate: [EmpresaGuard],
    children: [
      { path: 'perfil/:ID', component: PerfilComponent },
      { path: 'inicio', component: VistaEmpresaComponent },
    ],
  },
  { path: '**', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
