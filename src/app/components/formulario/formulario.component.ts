import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Solicitudes } from 'src/app/models/solicitudes';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { CargarScriptsService } from './../../cargar-scripts.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [LoginService, UsuarioService],
})
export class FormularioComponent implements OnInit {
  public postModelo: Solicitudes;
  public token;
  public identidad;

  constructor(
    private _userService: UsuarioService,
    private _loginService: LoginService,
    private _router: Router,
    private _CargaScripts: CargarScriptsService,
    private _activatedRoute: ActivatedRoute
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

    _CargaScripts.Carga(['ejemplo']);
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      localStorage.setItem('idBeca', dataRuta.get('Beca'));
    });
  }

  enviarSolicitud() {
    this._userService
      .enviarSolicitud(
        localStorage.getItem('idBeca'),
        this.token,
        this.postModelo
      )
      .subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Tu solicitud ha sido enviada correctamente. Pronto se te notificará el estatus de tu solicitud.',
          }).then((result) => {
            this._router.navigate(['/usuario/inicio']);
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
