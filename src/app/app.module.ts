import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarInicioComponent } from './components/navbar-inicio/navbar-inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RouterUsuarioComponent } from './components/router-usuario/router-usuario.component';
import { RouterAdminComponent } from './components/router-admin/router-admin.component';
import { RouterEmpresaComponent } from './components/router-empresa/router-empresa.component';
import { VistaUsuarioComponent } from './components/vista-usuario/vista-usuario.component';
import { VistaEmpresaComponent } from './components/vista-empresa/vista-empresa.component';
import { UsuariosRegistradosComponent } from './components/usuarios-registrados/usuarios-registrados.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { NavbarVistasComponent } from './components/navbar-vistas/navbar-vistas.component';
import { BecaComponent } from './components/beca/beca.component';
import { SolicitantesComponent } from './components/solicitantes/solicitantes.component';
import { VerEmpresaComponent } from './components/ver-empresa/ver-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarInicioComponent,
    LoginComponent,
    RegistroComponent,
    RouterUsuarioComponent,
    RouterAdminComponent,
    RouterEmpresaComponent,
    VistaUsuarioComponent,
    VistaEmpresaComponent,
    UsuariosRegistradosComponent,
    PerfilComponent,
    AdministracionComponent,
    NavbarVistasComponent,
    BecaComponent,
    SolicitantesComponent,
    VerEmpresaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
