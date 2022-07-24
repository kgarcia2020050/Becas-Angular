import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [LoginService],
})
export class RegistroComponent implements OnInit {
  public postModelo: Usuario;
  constructor(private _loginService: LoginService, private _router: Router) {
    this.postModelo = new Usuario('', '', '', '', '', '', '', '');
  }

  public generos = [{ genero: 'Masculino' }, { genero: 'Femenino' }];

  ngOnInit(): void {
    localStorage.clear();
  }
  postUsuarios() {
    this._loginService.registroUsuarios(this.postModelo).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Te has registrado exitosamente',
        }).then((redireccionar) => {
          this._router.navigate(['/login']);
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      }
    );
  }
}
