import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [LoginService, UsuarioService],
})
export class PerfilComponent implements OnInit {
  public getIdModelo: Usuario;
  public token;

  public identidad;
  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) {
    this.getIdModelo = new Usuario('', '', '', '', '', '', '', '');
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.perfilId(dataRuta.get('ID'));
    });
  }

  perfilId(id) {
    this._usuarioService.perfilId(id, this.token).subscribe({
      next: (response: any) => {
        this.getIdModelo = response.Usuario_encontrado;
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  putPerfil() {
    this._usuarioService.editarPerfil(this.getIdModelo, this.token).subscribe({
      next: (response: any) => {
        if (this.getIdModelo.rol == 'USUARIO') {
          this._router.navigate(['/usuario/inicio']);
        } else if (this.getIdModelo.rol == 'ADMIN') {
          this._router.navigate(['/principal/administracion']);
        } else if (this.getIdModelo.rol == 'EMPRESA') {
          this._router.navigate(['/empresas/inicio']);
        }
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }
}
