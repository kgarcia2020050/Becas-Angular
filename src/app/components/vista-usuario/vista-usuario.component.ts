import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css'],
  providers: [AdminService, LoginService],
})
export class VistaUsuarioComponent implements OnInit {
  public getModelo: Usuario;
  public token;
  public identidad;

  constructor(
    private _adminService: AdminService,
    private _loginService: LoginService
  ) {
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this.empresasRegistradas();
  }
  empresasRegistradas() {
    this._adminService.empresasRegistradas(this.token).subscribe({
      next: (response: any) => {
        this.getModelo = response.Empresas_registradas;
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
