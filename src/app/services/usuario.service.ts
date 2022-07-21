import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public url: String = 'http://localhost:3000/api/';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  public identidad;

  constructor(public _http: HttpClient, public _loginService: LoginService) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  perfilId(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/usuarioId/' + id, {
      headers: headersToken,
    });
  }

  editarPerfil(modelo: Usuario, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelo);

    return this._http.put(
      this.url + '/editarPerfil/' + modelo._id,
      parametros,
      { headers: headersToken }
    );
  }


}
