import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

import { Solicitudes } from 'src/app/models/solicitudes';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css'],
  providers: [SolicitudesService, LoginService],
})
export class SolicitudesComponent implements OnInit {
  public getModelo: Solicitudes;
  public postModelo: Solicitudes;
  public token;
  public identidad;

  constructor(
    private _solicitudService: SolicitudesService,
    private _loginService: LoginService
  ) {
    this.postModelo = new Solicitudes(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      null,
      ''
    );

    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this.misSolicitudes();
  }

  misSolicitudes() {
    this._solicitudService.misSolicitudes(this.token).subscribe({
      next: (response: any) => {
        this.getModelo = response.MisSolicitudes;
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  cancelarSolicitud(id) {
    Swal.fire({
      title: '¿Está seguro de cancelar la solicitud?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancelar solicitud.',
      cancelButtonText: 'Regresar.',
    }).then((result) => {
      if (result.isConfirmed) {
        this._solicitudService.cancelarSolicitud(id, this.token).subscribe({
          next: (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Solicitud cancelada.',
            });
            this.misSolicitudes();
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: error.error.Error,
            });
          },
        });
      }
    });
  }

  borrarSolicitud(id) {
    Swal.fire({
      title: '¿Quieres borrar la nota?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si.',
      cancelButtonText: 'Cancelar.',
    }).then((result) => {
      if (result.isConfirmed) {
        this._solicitudService.cancelarSolicitud(id, this.token).subscribe({
          next: (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Nota borrada.',
            });
            this.misSolicitudes();
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: error.error.Error,
            });
          },
        });
      }
    });
  }
}
