import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { BecasService } from 'src/app/services/becas.service';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css'],
  providers: [BecasService, LoginService],
})
export class VistaUsuarioComponent implements OnInit {
  public getModelo: any
  public token;
  public identidad;

  constructor(
    private _becaService: BecasService,
    private _loginService: LoginService
  ) {
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this.empresasRegistradas();
    localStorage.removeItem('idBeca');
  }
  empresasRegistradas() {
    this._becaService.obtenerBecas().subscribe({
      next: (response: any) => {
        this.getModelo = response.Becas;
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
