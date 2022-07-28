import { Component, OnInit } from '@angular/core';
import { Solicitudes } from 'src/app/models/solicitudes';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitantes',
  templateUrl: './solicitantes.component.html',
  styleUrls: ['./solicitantes.component.css'],
  providers: [SolicitudesService, LoginService],
})
export class SolicitantesComponent implements OnInit {
  public getModelo: Solicitudes;
  public postModelo: Solicitudes;
  public getIdModelo: Solicitudes;
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
    this.solicitantes();
  }

  solicitantes() {
    this._solicitudService.solicitantes(this.token).subscribe({
      next: (response: any) => {
        this.getModelo = response.Solicitudes;
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
