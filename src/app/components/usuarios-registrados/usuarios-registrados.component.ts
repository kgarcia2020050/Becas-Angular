import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-registrados',
  templateUrl: './usuarios-registrados.component.html',
  styleUrls: ['./usuarios-registrados.component.css'],
  providers: [LoginService, AdminService],
})
export class UsuariosRegistradosComponent implements OnInit {
  public getModelo: Usuario;
  public token;

  constructor(
    private _loginService: LoginService,
    private _adminService: AdminService
  ) {
    this.token = this._loginService.obtenerToken();
  }

  ngOnInit(): void {
    this.usuariosRegistrados()
  }

  usuariosRegistrados() {
    this._adminService.usuariosRegistrados(this.token).subscribe({
      next: (response: any) => {
        this.getModelo = response.Usuarios_registrados;
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
