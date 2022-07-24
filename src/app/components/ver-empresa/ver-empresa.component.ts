import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { BecasService } from 'src/app/services/becas.service';
import { Becas } from 'src/app/models/becas';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.css'],
  providers: [LoginService, BecasService],
})
export class VerEmpresaComponent implements OnInit {
  public getIdModelo: Becas;
  public token;
  public identidad;
  constructor(
    private _becasService: BecasService,
    private _loginService: LoginService,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) {
    this.getIdModelo = new Becas('', '', '', '', 0, '');
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.obtenerBeca(dataRuta.get('ID'));
    });
  }

  obtenerBeca(id) {
    this._becasService.becaId(id, this.token).subscribe({
      next: (response: any) => {
        this.getIdModelo = response.Beca_encontrada;
        console.log(this.getIdModelo.vacantes)
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  editarBeca() {
    this._becasService.editarBeca(this.getIdModelo, this.token).subscribe({
      next: (response: any) => {
        this._router.navigate(['/empresas/inicio']);
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
