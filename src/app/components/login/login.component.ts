import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  public modelo: Usuario;

  public identidad;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.modelo = new Usuario('', '', '', '', '', '', '', '');
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  obtenerTokenPromesa(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._loginService.login(this.modelo, 'true').subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.Token);
          resolve(response);
        },
        error: (error: any) => {
          console.log(<any>error);
        },
      });
    });
  }

  login() {
    this._loginService.login(this.modelo).subscribe({
      next: (response: any) => {
        this.obtenerTokenPromesa().then((respuesta) => {
          localStorage.setItem(
            'identidad',
            JSON.stringify(response.Inicio_exitoso)
          );
          if (response.Inicio_exitoso.rol == 'ADMIN') {
            this._router.navigate(['/principal/administracion']);
          } else if (response.Inicio_exitoso.rol == 'USUARIO') {
            this._router.navigate(['/usuario/inicio']);
          } else if (response.Inicio_exitoso.rol == 'EMPRESA') {
            this._router.navigate(['/empresas/inicio']);
          } else {
            this._router.navigate(['/inicio']);
          }
        });
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
