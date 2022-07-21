import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [AdminService, LoginService],
})
export class AdministracionComponent implements OnInit {
  public getModelo: Usuario;
  public postModelo: Usuario;
  public token;
  public identidad;

  constructor(
    private _adminService: AdminService,
    private _loginService: LoginService
  ) {
    this.postModelo = new Usuario('', '', '', '', '', '', '', '');
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

  postEmpresa(addForm) {
    this._adminService.nuevaEmpresa(this.postModelo, this.token).subscribe({
      next: (response: any) => {
        this.empresasRegistradas();
        addForm.reset();
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
