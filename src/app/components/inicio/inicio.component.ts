import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { BecasService } from 'src/app/services/becas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [BecasService],
})
export class InicioComponent implements OnInit {
  public getModelo: any;
  public page:Number;

  constructor(private _router: Router, private _becaService: BecasService) {}

  ngOnInit(): void {
    localStorage.clear();
    this.empresasRegistradas();

  }

  toLogin() {
    this._router.navigate(['login']);
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
