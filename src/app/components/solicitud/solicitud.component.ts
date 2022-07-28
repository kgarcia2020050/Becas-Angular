import { Component, OnInit } from '@angular/core';
import { Solicitudes } from 'src/app/models/solicitudes';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
  providers: [SolicitudesService, LoginService],
})
export class SolicitudComponent implements OnInit {
  public getModelo: Solicitudes;
  public postModelo: Solicitudes;
  public getIdModelo: Solicitudes;
  public token;
  public identidad;

  constructor(
    private _solicitudService: SolicitudesService,
    private _loginService: LoginService,
    private _aRoute: ActivatedRoute,
    private _router: Router
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
    this.getIdModelo = new Solicitudes(
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
    this._aRoute.paramMap.subscribe((dataRuta) => {
      this.verSolicitud(dataRuta.get('ID'));
    });
  }

  verSolicitud(id) {
    this._solicitudService.verSolicitud(id, this.token).subscribe({
      next: (response: any) => {
        this.getIdModelo = response.Solicitud;
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  aprobar(id, idBeca) {
    this._solicitudService.aprobar(id, idBeca, this.token).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud aprobada',
        }).then((respuesta) => {
          this._router.navigate(['/empresas/inicio']);
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

  denegar(id) {
    this._solicitudService.denegar(id, this.token).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud denegada',
        }).then((respuesta) => {
          this._router.navigate(['/empresas/inicio']);
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
