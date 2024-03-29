import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public url: String = 'https://becas-nodejs.herokuapp.com/api/';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public identidad;
  public token;

  constructor(public _http: HttpClient) {}

  login(usuario, obtenerToken = null): Observable<any> {
    if (obtenerToken != null) {
      usuario.obtenerToken = obtenerToken;
    }
    let params = JSON.stringify(usuario);

    return this._http.post(this.url + 'login', params, {
      headers: this.headersVariable,
    });
  }

  obtenerToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != undefined) {
      this.token = token2;
    } else {
      this.token = '';
    }
    return this.token;
  }

  obtenerIdentidad() {
    var identidad2 = localStorage.getItem('identidad');
    if (identidad2 != undefined) {
      this.identidad = identidad2;
    } else {
      this.identidad = '';
    }
    return this.identidad;
  }

  registroUsuarios(modeloUsuario: Usuario): Observable<any> {
    let parametros = JSON.stringify(modeloUsuario);

    return this._http.post(this.url + 'registro', parametros, {
      headers: this.headersVariable,
    });
  }
}
