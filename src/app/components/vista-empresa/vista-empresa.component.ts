import { Component, OnInit } from '@angular/core';
import { Becas } from 'src/app/models/becas';
import { BecasService } from 'src/app/services/becas.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-empresa',
  templateUrl: './vista-empresa.component.html',
  styleUrls: ['./vista-empresa.component.css'],
  providers: [BecasService, LoginService],
})
export class VistaEmpresaComponent implements OnInit {
  public getModelo: Becas;
  public postModelo: Becas;
  public getIdModelo: Becas;
  public token;
  public identidad;
  constructor(private _becas: BecasService, _loginService: LoginService) {
    this.postModelo = new Becas('', '', '', '', 0, '');
    this.getIdModelo = new Becas('', '', '', '', 0, '');
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
    this.token = _loginService.obtenerToken();
  }

  ngOnInit(): void {
    this.misBecas();
  }

  misBecas() {
    this._becas.becasEmpresa(this.identidad._id).subscribe({
      next: (response: any) => {
        this.getModelo = response.BecasEncontradas;
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  agregarBeca(addForm) {
    this._becas.agregarBeca(this.postModelo, this.token).subscribe({
      next: (response: any) => {
        this.misBecas();
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
